using Microsoft.EntityFrameworkCore.ChangeTracking;
using API.DTOs.Board;
using API.Entities;

namespace API.Interfaces
{
    public interface IBoardRepository
    {
        Task<IEnumerable<BoardDataDto>> GetBoardsAsync();
        Task<BoardDataDto> GetBoardByIdAsync(int id);
        Task<IEnumerable<BoardNamesDto>> GetNamesOfBoardsAsync();
        Task<EntityEntry<AppBoard>> CreateBoardAsync(AppBoard board);
        Task<AppBoard> FindBoardByIdAsync(int id);
        bool DeleteBoard(AppBoard boardToDelete);
        Task<bool> BoardExists(string name);
        void Update(AppBoard board);
    }
}