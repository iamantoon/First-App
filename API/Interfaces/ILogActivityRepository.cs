using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ILogActivityRepository
    {
        // create, change name/description/due date/priority, move, delete
        Task<bool> LogCreateCardAsync(string cardName, string listName);
        Task<bool> LogChangeNameAsync(string previousName, string newName);
        Task<bool> LogChangeDescriptionAsync(string cardName, string previousDescription, string newDescription);
        Task<bool> LogChangeDueDateAsync(string cardName, DateOnly previousDate, DateOnly newDate);
        Task<bool> LogChangePriorityAsync(string cardName, string previousPriority, string newPriority);
        Task<bool> LogMoveCardAsync(string cardName, string previousList, string newList);
        Task<bool> LogDeleteCardAsync(string cardName, string listName);
        Task<ActivityResponseDto> GetActivitiesAsync(int pageSize);
        void Update(Activity activity);
        Task<bool> SaveAllAsync();
    }
}