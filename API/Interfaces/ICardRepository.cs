using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace API.Interfaces
{
    public interface ICardRepository
    {
        Task<EntityEntry<Card>> CreateCardAsync(Card card);
        Task<CardDto> UpdateCardAsync(UpdateCardDto card);
        Task<Card> FindCardByIdAsync(int id);
        bool DeleteCard(Card cardToDelete);
        void Update(Card card);
    }
}