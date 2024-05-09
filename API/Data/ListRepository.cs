using Microsoft.EntityFrameworkCore.ChangeTracking;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using API.Interfaces;
using API.DTOs.List;
using API.Entities;
using AutoMapper;

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

        public async Task<IEnumerable<ListDto>> GetListsAsync(int boardId)
        {
            return await _context.Lists
                .Where(l => l.AppBoardId == boardId)
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

        public async Task<IEnumerable<ListNamesDto>> GetNamesOfListsAsync(int boardId)
        {
            return await _context.Lists
                .Where(l => l.Id == boardId)
                .Select(list => new ListNamesDto { Id = list.Id, Name = list.Name })
                .ToListAsync();
        }

        public async Task<EntityEntry<AppList>> CreateListAsync(AppList list)
        {
            return await _context.Lists.AddAsync(list);
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

        public async Task<bool> ListExistsAsync(string name, int boardId)
        {
            var listNames = await GetNamesOfListsAsync(boardId).ConfigureAwait(false);

            return listNames.Any(list => string.Equals(list.Name, name));
        }

        public void Update(AppList list)
        {
            _context.Entry(list).State = EntityState.Modified;
        }
    }
}