using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ICardRepository
    {
        Task<bool> CreateCardAsync(Card card);
        Task<CardDto> UpdateCardAsync(UpdateCardDto card);
        Task<Card> FindCardByIdAsync(int id);
        bool DeleteCard(Card cardToDelete);
        void Update(Card card);
        Task<bool> SaveAllAsync();
    }
}