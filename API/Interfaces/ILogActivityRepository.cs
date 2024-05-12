using Microsoft.EntityFrameworkCore.ChangeTracking;
using API.DTOs.Activity;
using API.Entities;

namespace API.Interfaces
{
    public interface ILogActivityRepository
    {
        Task<EntityEntry<Activity>> LogCreateCardAsync(string cardName, int cardId, string listName, int boardId);
        Task<EntityEntry<Activity>> LogChangeNameAsync(int cardId, string previousName, string newName, int boardId);
        Task<EntityEntry<Activity>> LogChangeDescriptionAsync(string cardName, int cardId, string previousDescription, string newDescription, int boardId);
        Task<EntityEntry<Activity>> LogChangeDueDateAsync(string cardName, int cardId, DateOnly previousDate, DateOnly newDate, int boardId);
        Task<EntityEntry<Activity>> LogChangePriorityAsync(string cardName, int cardId, string previousPriority, string newPriority, int boardId);
        Task<EntityEntry<Activity>> LogMoveCardAsync(string cardName, int cardId, string previousList, string newList, int boardId);
        Task<EntityEntry<Activity>> LogDeleteCardAsync(string cardName, int cardId, string listName, int boardId);
        Task<ActivityResponseDto> GetActivitiesByBoardIdAsync(int boardId, int pageSize);
        Task<IEnumerable<ActivityDto>> GetActivitiesByCardIdAsync(int cardId);
        void Update(Activity activity);
    }
}