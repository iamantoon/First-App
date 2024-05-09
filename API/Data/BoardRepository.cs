using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using API.DTOs.Board;
using API.Interfaces;
using API.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using API.DTOs.List;

namespace API.Data
{
    public class BoardRepository : IBoardRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public BoardRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<BoardDataDto>> GetBoardsAsync()
        {
            var boards = await _context.Boards
                .ProjectTo<BoardDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            var boardDataList = new List<BoardDataDto>();

            foreach (var board in boards)
            {
                var listNames = new List<ListNamesDto>();

                foreach (var list in board.Lists)
                {
                    listNames.Add(new ListNamesDto
                    {
                        Id = list.Id,
                        Name = list.Name,
                        BoardId = board.Id
                    });
                }

                var boardData = new BoardDataDto
                {
                    Id = board.Id,
                    Name = board.Name,
                    Lists = board.Lists,
                    ListNames = listNames
                };

                boardDataList.Add(boardData);
            }

            return boardDataList;
        }

        public async Task<BoardDataDto> GetBoardByIdAsync(int id)
        {
            var board = await _context.Boards
                .Include(b => b.Lists)
                .Where(b => b.Id == id)
                .ProjectTo<BoardDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();

            if (board == null)
            {
                return null;
            }

            var listNames = await _context.Lists
                .Where(l => l.AppBoardId == id)
                .Select(list => new ListNamesDto { Id = list.Id, BoardId = id, Name = list.Name })
                .ToListAsync();

            var boardDataDto = new BoardDataDto
            {
                Id = board.Id,
                Name = board.Name,
                Lists = board.Lists, 
                ListNames = listNames
            };

            return boardDataDto;
        }

        public async Task<EntityEntry<AppBoard>> CreateBoardAsync(AppBoard board)
        {
            return await _context.Boards.AddAsync(board);
        }

        public bool DeleteBoard(AppBoard boardToDelete)
        {
            var deletedBoard = _context.Boards.Remove(boardToDelete);
            return deletedBoard != null;
        }

        public async Task<IEnumerable<BoardNamesDto>> GetNamesOfBoardsAsync()
        {
            return await _context.Boards
                .Select(board => new BoardNamesDto { Id = board.Id, Name = board.Name })
                .ToListAsync();
        }

        public async Task<AppBoard> FindBoardByIdAsync(int id)
        {
            return await _context.Boards.FindAsync(id);
        }

        public async Task<bool> BoardExists(string name)
        {
            var board = await _context.Boards.FirstOrDefaultAsync(x => x.Name.ToLower() == name.ToLower());
            return board != null;
        }

        public void Update(AppBoard board)
        {
            _context.Entry(board).State = EntityState.Modified;
        }
    }
}