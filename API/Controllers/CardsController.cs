using Microsoft.AspNetCore.Mvc;
using API.Interfaces;
using API.Entities;
using AutoMapper;
using API.DTOs.Card;

namespace API.Controllers
{
    public class CardsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public CardsController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
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
                AppListId = createCardDto.ListId,
                AppBoardId = createCardDto.BoardId
            };

            var list = await _unitOfWork.ListRepository.FindListByIdAsync(createCardDto.ListId);

            await _unitOfWork.CardRepository.CreateCardAsync(card);

            if (_unitOfWork.HasChanges())
            {
                await _unitOfWork.Complete();
                await _unitOfWork.LogActivityRepository.LogCreateCardAsync(card.Name, card.Id, list.Name, createCardDto.BoardId);
                await _unitOfWork.Complete();
                var cardDto = _mapper.Map<CardDto>(card);
                return CreatedAtAction(nameof(GetCard), new { id = card.Id }, cardDto); // 201
            }

            return BadRequest("Failed to create card");
        }

        [HttpPatch]
        public async Task<ActionResult<CardDto>> UpdateCard(UpdateCardDto updateCardDto)
        {
            var cardToUpdate = await _unitOfWork.CardRepository.FindCardByIdAsync(updateCardDto.Id);

            if (cardToUpdate == null) return NotFound();

            if (updateCardDto.Name != null && updateCardDto.Name != cardToUpdate.Name){
                await _unitOfWork.LogActivityRepository.LogChangeNameAsync(updateCardDto.Id, cardToUpdate.Name, updateCardDto.Name, updateCardDto.BoardId);
                cardToUpdate.Name = updateCardDto.Name;
                await _unitOfWork.Complete();
            }

            if (updateCardDto.Description != null && updateCardDto.Description != cardToUpdate.Description){
                await _unitOfWork.LogActivityRepository.LogChangeDescriptionAsync(cardToUpdate.Name, updateCardDto.Id, cardToUpdate.Description, updateCardDto.Description, updateCardDto.BoardId);
                cardToUpdate.Description = updateCardDto.Description;
                await _unitOfWork.Complete();
            }

            if (updateCardDto.DueDate != default && updateCardDto.DueDate != cardToUpdate.DueDate){
                await _unitOfWork.LogActivityRepository.LogChangeDueDateAsync(cardToUpdate.Name, updateCardDto.Id, cardToUpdate.DueDate, updateCardDto.DueDate, updateCardDto.BoardId);
                cardToUpdate.DueDate = updateCardDto.DueDate;
                await _unitOfWork.Complete();
            }

            if (updateCardDto.Priority != null && updateCardDto.Priority != cardToUpdate.Priority){
                await _unitOfWork.LogActivityRepository.LogChangePriorityAsync(cardToUpdate.Name, updateCardDto.Id, cardToUpdate.Priority, updateCardDto.Priority, updateCardDto.BoardId);
                cardToUpdate.Priority = updateCardDto.Priority;
                await _unitOfWork.Complete();
            }

            if (updateCardDto.ListId > 0 && updateCardDto.ListId != cardToUpdate.AppListId){
                var previousList = await _unitOfWork.ListRepository.FindListByIdAsync(cardToUpdate.AppListId);
                var newList = await _unitOfWork.ListRepository.FindListByIdAsync(updateCardDto.ListId);
            
                await _unitOfWork.LogActivityRepository.LogMoveCardAsync(cardToUpdate.Name, updateCardDto.Id, previousList.Name, newList.Name, updateCardDto.BoardId);
                cardToUpdate.AppListId = updateCardDto.ListId;
                await _unitOfWork.Complete();
            }

            await _unitOfWork.Complete();

            return _mapper.Map<CardDto>(cardToUpdate);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteCard(int id)
        {
            var cardToDelete = await _unitOfWork.CardRepository.FindCardByIdAsync(id);

            if (cardToDelete == null) return NotFound();

            var list = await _unitOfWork.ListRepository.FindListByIdAsync(cardToDelete.AppListId);

            _unitOfWork.CardRepository.DeleteCard(cardToDelete);

            if (_unitOfWork.HasChanges()) {
                await _unitOfWork.Complete();
                await _unitOfWork.LogActivityRepository.LogDeleteCardAsync(cardToDelete.Name, id, list.Name, list.AppBoardId);
                await _unitOfWork.Complete();
                return Ok();
            }

            return BadRequest("Failed to delete card");
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CardDto>> GetCard(int id)
        {
            var card = await _unitOfWork.CardRepository.FindCardByIdAsync(id);

            if (card == null)
            {
                return NotFound(); 
            }

            var cardDto = _mapper.Map<CardDto>(card);

            return Ok(cardDto);
        }
    }
}