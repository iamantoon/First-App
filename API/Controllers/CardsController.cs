using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CardsController : BaseApiController
    {
        private readonly ICardRepository _cardRepository;
        private readonly IMapper _mapper;
        private readonly ILogActivityRepository _logActivityRepository;
        private readonly IListRepository _listRepository;
        public CardsController(ICardRepository cardRepository, IMapper mapper, ILogActivityRepository logActivityRepository, 
            IListRepository listRepository)
        {
            _cardRepository = cardRepository;
            _logActivityRepository = logActivityRepository;
            _listRepository = listRepository;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<CardDto>> CreateCard(CreateCardDto createCardDto)
        {
            var card = new Card
            {
                Name = createCardDto.Name,
                Description = createCardDto.Description,
                DueDate = createCardDto.DueDate,
                Priority = createCardDto.Priority,
                AppListId = createCardDto.ListId
            };

            var list = await _listRepository.FindListByIdAsync(createCardDto.ListId);

            if (await _cardRepository.CreateCardAsync(card))
            {
                await _logActivityRepository.LogCreateCardAsync(card.Name, card.Id, list.Name);
                var cardDto = _mapper.Map<CardDto>(card);
                return CreatedAtAction(nameof(GetCard), new { id = card.Id }, cardDto); // 201
            }

            return BadRequest("Failed to create card");
        }

        [HttpPatch]
        public async Task<ActionResult<CardDto>> UpdateCard(UpdateCardDto updateCardDto)
        {
            var cardToUpdate = await _cardRepository.FindCardByIdAsync(updateCardDto.Id);

            if (cardToUpdate == null) return NotFound();

            if (updateCardDto.Name != null && updateCardDto.Name != cardToUpdate.Name){
                await _logActivityRepository.LogChangeNameAsync(updateCardDto.Id, cardToUpdate.Name, updateCardDto.Name);
                cardToUpdate.Name = updateCardDto.Name;
            }

            if (updateCardDto.Description != null && updateCardDto.Description != cardToUpdate.Description){
                await _logActivityRepository.LogChangeDescriptionAsync(cardToUpdate.Name, updateCardDto.Id, cardToUpdate.Description, updateCardDto.Description);
                cardToUpdate.Description = updateCardDto.Description;
            }

            if (updateCardDto.DueDate != default && updateCardDto.DueDate != cardToUpdate.DueDate){
                await _logActivityRepository.LogChangeDueDateAsync(cardToUpdate.Name, updateCardDto.Id, cardToUpdate.DueDate, updateCardDto.DueDate);
                cardToUpdate.DueDate = updateCardDto.DueDate;
            }

            if (updateCardDto.Priority != null && updateCardDto.Priority != cardToUpdate.Priority){
                await _logActivityRepository.LogChangePriorityAsync(cardToUpdate.Name, updateCardDto.Id, cardToUpdate.Priority, updateCardDto.Priority);
                cardToUpdate.Priority = updateCardDto.Priority;
            }

            if (updateCardDto.ListId > 0 && updateCardDto.ListId != cardToUpdate.AppListId){
                var previousList = await _listRepository.FindListByIdAsync(cardToUpdate.AppListId);
                var newList = await _listRepository.FindListByIdAsync(updateCardDto.ListId);
            
                await _logActivityRepository.LogMoveCardAsync(cardToUpdate.Name, updateCardDto.Id, previousList.Name, newList.Name);
                cardToUpdate.AppListId = updateCardDto.ListId;
            }

            await _cardRepository.SaveAllAsync();

            return _mapper.Map<CardDto>(cardToUpdate);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteCard(int id)
        {
            var cardToDelete = await _cardRepository.FindCardByIdAsync(id);

            if (cardToDelete == null) return NotFound();

            var list = await _listRepository.FindListByIdAsync(cardToDelete.AppListId);

            _cardRepository.DeleteCard(cardToDelete);

            if (await _cardRepository.SaveAllAsync()) {
                await _logActivityRepository.LogDeleteCardAsync(cardToDelete.Name, id, list.Name);
                return Ok();
            }

            return BadRequest("Failed to delete card");
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CardDto>> GetCard(int id)
        {
            var card = await _cardRepository.FindCardByIdAsync(id);
            if (card == null)
            {
                return NotFound(); 
            }
            var cardDto = _mapper.Map<CardDto>(card);
            return Ok(cardDto);
        }
    }
}