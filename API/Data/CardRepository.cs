using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore;
using API.Interfaces;
using API.Entities;

namespace API.Data
{
    public class CardRepository : ICardRepository
    {
        private readonly DataContext _context;
        public CardRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<EntityEntry<Card>> CreateCardAsync(Card card)
        {
            return await _context.Cards.AddAsync(card);
        }

        public bool DeleteCard(Card cardToDelete)
        {
            var deletedCard = _context.Cards.Remove(cardToDelete);

            return deletedCard != null;
        }

        public async Task<Card> FindCardByIdAsync(int id)
        {
            return await _context.Cards.FindAsync(id);
        }
        
        public void Update(Card card)
        {
             _context.Entry(card).State = EntityState.Modified;
        }
    }
}