using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace API.Interfaces
{
    public interface ILogActivityRepository
    {
        // create, change name/description/due date/priority, move, delete
        Task<EntityEntry<Activity>> LogCreateCardAsync(string cardName, int cardId, string listName);
        Task<EntityEntry<Activity>> LogChangeNameAsync(int cardId, string previousName, string newName);
        Task<EntityEntry<Activity>> LogChangeDescriptionAsync(string cardName, int cardId, string previousDescription, string newDescription);
        Task<EntityEntry<Activity>> LogChangeDueDateAsync(string cardName, int cardId, DateOnly previousDate, DateOnly newDate);
        Task<EntityEntry<Activity>> LogChangePriorityAsync(string cardName, int cardId, string previousPriority, string newPriority);
        Task<EntityEntry<Activity>> LogMoveCardAsync(string cardName, int cardId, string previousList, string newList);
        Task<EntityEntry<Activity>> LogDeleteCardAsync(string cardName, int cardId, string listName);
        Task<ActivityResponseDto> GetActivitiesAsync(int pageSize);
        Task<IEnumerable<ActivityDto>> GetActivitiesByCardIdAsync(int cardId);
        void Update(Activity activity);
    }
}