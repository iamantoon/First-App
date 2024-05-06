using API.Entities;
using API.DTOs;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace API.Interfaces
{
    public interface IListRepository
    {
        Task<IEnumerable<ListDto>> GetListsAsync();
        Task<ListDto> GetListByIdAsync(int id);
        Task<IEnumerable<ListNamesDto>> GetNamesOfListsAsync();
        Task<EntityEntry<AppList>> CreateListAsync(AppList list);
        Task<ListDto> UpdateListAsync();
        Task<AppList> FindListByIdAsync(int id);
        bool DeleteList(AppList listToDelete);
        Task<bool> ListExists(string name);
        void Update(AppList list);
    }
}