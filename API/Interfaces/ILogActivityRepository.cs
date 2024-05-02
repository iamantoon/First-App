using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ILogActivityRepository
    {
        // create, change name/description/due date/priority, move, delete
        Task<bool> LogCreateCardAsync(string cardName, int cardId, string listName);
        Task<bool> LogChangeNameAsync(int cardId, string previousName, string newName);
        Task<bool> LogChangeDescriptionAsync(string cardName, int cardId, string previousDescription, string newDescription);
        Task<bool> LogChangeDueDateAsync(string cardName, int cardId, DateOnly previousDate, DateOnly newDate);
        Task<bool> LogChangePriorityAsync(string cardName, int cardId, string previousPriority, string newPriority);
        Task<bool> LogMoveCardAsync(string cardName, int cardId, string previousList, string newList);
        Task<bool> LogDeleteCardAsync(string cardName, int cardId, string listName);
        Task<ActivityResponseDto> GetActivitiesAsync(int pageSize);
        Task<IEnumerable<ActivityDto>> GetActivitiesByCardIdAsync(int cardId);
        void Update(Activity activity);
        Task<bool> SaveAllAsync();
    }
}