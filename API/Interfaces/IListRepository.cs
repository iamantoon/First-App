using API.Entities;
using API.DTOs;

namespace API.Interfaces
{
    public interface IListRepository
    {
        Task<IEnumerable<ListDto>> GetListsAsync();
        Task<bool> CreateListAsync(AppList list);
        Task<ListDto> UpdateListAsync();
        Task<AppList> FindListByIdAsync(int id);
        bool DeleteList(AppList listToDelete);
        Task<bool> ListExists(string name);
        void Update(AppList list);
        Task<bool> SaveAllAsync();
    }
}