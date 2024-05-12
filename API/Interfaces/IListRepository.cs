using Microsoft.EntityFrameworkCore.ChangeTracking;
using API.DTOs.List;
using API.Entities;

namespace API.Interfaces
{
    public interface IListRepository
    {
        Task<IEnumerable<ListDto>> GetListsAsync(int boardId);
        Task<ListDto> GetListByIdAsync(int id);
        Task<IEnumerable<ListNamesDto>> GetNamesOfListsAsync(int boardId);
        Task<EntityEntry<AppList>> CreateListAsync(AppList list);
        Task<AppList> FindListByIdAsync(int id);
        bool DeleteList(AppList listToDelete);
        Task<bool> ListExistsAsync(string name, int boardId);
        void Update(AppList list);
    }
}