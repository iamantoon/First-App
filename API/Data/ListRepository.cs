using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace API.Data
{
    public class ListRepository : IListRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ListRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ListDto>> GetListsAsync()
        {
            return await _context.Lists
                .ProjectTo<ListDto>(_mapper.ConfigurationProvider)
                .ToListAsync();   
        }

        public async Task<ListDto> GetListByIdAsync(int id)
        {
            return await _context.Lists
                .Where(l => l.Id == id)
                .ProjectTo<ListDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<ListNamesDto>> GetNamesOfListsAsync()
        {
            return await _context.Lists
                .Select(list => new ListNamesDto { Id = list.Id, Name = list.Name })
                .ToListAsync();
        }

        public async Task<EntityEntry<AppList>> CreateListAsync(AppList list)
        {
            return await _context.Lists.AddAsync(list);
        }

        public Task<ListDto> UpdateListAsync()
        {
            throw new NotImplementedException(); /// egeggeggrggregernrnrthrrththr
        }

        public bool DeleteList(AppList listToDelete)
        {
            var deletedList = _context.Lists.Remove(listToDelete);

            if (deletedList == null) return false;

            return true;
        }

        public async Task<AppList> FindListByIdAsync(int id)
        {
            return await _context.Lists.FindAsync(id);
        }

        public async Task<bool> ListExists(string name)
        {
            var list = await _context.Lists.FirstOrDefaultAsync(x => x.Name.ToLower() == name.ToLower());

            if (list != null) return true;

            return false;
        }

        public void Update(AppList list)
        {
            _context.Entry(list).State = EntityState.Modified;
        }
    }
}