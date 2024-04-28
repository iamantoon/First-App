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
        public CardsController(ICardRepository cardRepository, IMapper mapper)
        {
            _cardRepository = cardRepository;
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

            if (await _cardRepository.CreateCardAsync(card)) return NoContent();
        
            return BadRequest("Failed to create card");
        }

        [HttpPatch]
        public async Task<ActionResult<CardDto>> UpdateCard(UpdateCardDto updateCardDto)
        {
            var cardToUpdate = await _cardRepository.FindCardByIdAsync(updateCardDto.Id);

            if (cardToUpdate == null) return NotFound();

            if (updateCardDto.Name != null)
                cardToUpdate.Name = updateCardDto.Name;

            if (updateCardDto.Description != null)
                cardToUpdate.Description = updateCardDto.Description;

            if (updateCardDto.DueDate != default)
                cardToUpdate.DueDate = updateCardDto.DueDate;

            if (updateCardDto.Priority != null)
                cardToUpdate.Priority = updateCardDto.Priority;

            if (updateCardDto.ListId > 0)
                cardToUpdate.AppListId = updateCardDto.ListId;

            await _cardRepository.SaveAllAsync();

            return _mapper.Map<CardDto>(cardToUpdate);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteCard(int id)
        {
            var cardToDelete = await _cardRepository.FindCardByIdAsync(id);

            if (cardToDelete == null) return NotFound();
                
            _cardRepository.DeleteCard(cardToDelete);

            if (await _cardRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to delete card");
        }
    }
}