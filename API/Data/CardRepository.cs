using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class CardRepository : ICardRepository
    {
        private readonly DataContext _context;
        public CardRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> CreateCardAsync(Card card)
        {
            await _context.Cards.AddAsync(card);
            return await _context.SaveChangesAsync() > 0;
        }
        public Task<CardDto> UpdateCardAsync(UpdateCardDto card)
        {
            throw new NotImplementedException();
        }

        public bool DeleteCard(Card cardToDelete)
        {
           var deletedCard = _context.Cards.Remove(cardToDelete);

            if (deletedCard == null) return false;

            return true;
        }

        public async Task<Card> FindCardByIdAsync(int id)
        {
            return await _context.Cards.FindAsync(id);
        }

        public void Update(Card card)
        {
             _context.Entry(card).State = EntityState.Modified;
        }
        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}