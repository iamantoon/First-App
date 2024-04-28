using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ICardRepository
    {
        Task<bool> CreateCardAsync(Card card);
        Task<CardDto> UpdateCardAsync(UpdateCardDto card);
        bool DeleteCard(Card cardToDelete);
        Task<Card> FindCardByIdAsync(int id);
        void Update(Card card);
        Task<bool> SaveAllAsync();
    }
}