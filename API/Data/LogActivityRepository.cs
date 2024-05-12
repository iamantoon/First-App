using Microsoft.EntityFrameworkCore.ChangeTracking;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using API.DTOs.Activity;
using API.Interfaces;
using API.Entities;
using AutoMapper;

namespace API.Data
{
    public class LogActivityRepository : ILogActivityRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public LogActivityRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ActivityResponseDto> GetActivitiesByBoardIdAsync(int boardId, int pageSize)
        {
            var activities = await _context.LoggedActivities
                .Where(a => a.BoardId == boardId)
                .Take(pageSize)
                .OrderByDescending(a => a.Date)
                .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            var totalCount = await _context.LoggedActivities.Where(a => a.BoardId == boardId).CountAsync();

            var response = new ActivityResponseDto
            {
                Activities = activities,
                PageSize = pageSize,
                TotalCount = totalCount
            };

            return response;
        }

        public async Task<IEnumerable<ActivityDto>> GetActivitiesByCardIdAsync(int cardId)
        {
            var activities = await _context.LoggedActivities
                .Where(a => a.CardId == cardId)
                .Take(7)
                .OrderByDescending(a => a.Date)
                .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return activities;
        }

        public async Task<EntityEntry<Activity>> LogChangeDescriptionAsync(string cardName, int cardId, string previousDescription, string newDescription, int boardId)
        {
            var activity = new Activity
            {
                CardName = cardName,
                CardId = cardId,
                BoardId = boardId,
                ActivityName = "changed the description",
                Previous = previousDescription,
                Updated = newDescription,
                Date = DateTime.Now,
            };

            return await _context.LoggedActivities.AddAsync(activity);
        }

        public async Task<EntityEntry<Activity>> LogChangeDueDateAsync(string cardName, int cardId, DateOnly previousDate, DateOnly newDate, int boardId)
        {
            var activity = new Activity
            {
                CardName = cardName,
                CardId = cardId,
                BoardId = boardId,
                ActivityName = "changed the date",
                Previous = Convert.ToString(previousDate),
                Updated = Convert.ToString(newDate),
                Date = DateTime.Now,
            };

            return await _context.LoggedActivities.AddAsync(activity);
        }

        public async Task<EntityEntry<Activity>> LogChangeNameAsync(int cardId, string cardName, string newName, int boardId)
        {
            var activity = new Activity
            {
                CardName = cardName,
                CardId = cardId,
                BoardId = boardId,
                ActivityName = "renamed",
                Previous = cardName,
                Updated = newName,
                Date = DateTime.Now,
            };

            return await _context.LoggedActivities.AddAsync(activity);
        }

        public async Task<EntityEntry<Activity>> LogChangePriorityAsync(string cardName, int cardId, string previousPriority, string newPriority, int boardId)
        {
            var activity = new Activity
            {
                CardName = cardName,
                CardId = cardId,
                BoardId = boardId,
                ActivityName = "changed the priority",
                Previous = previousPriority,
                Updated = newPriority,
                Date = DateTime.Now,
            };

            return await _context.LoggedActivities.AddAsync(activity);
        }

        public async Task<EntityEntry<Activity>> LogCreateCardAsync(string cardName, int cardId, string listName, int boardId)
        {
            var activity = new Activity
            {
                CardName = cardName,
                CardId = cardId,
                BoardId = boardId,
                ActivityName = "added",
                Previous = "",
                Updated = cardName,
                Date = DateTime.Now,
                ListName = listName
            };

            return await _context.LoggedActivities.AddAsync(activity);
        }

        public async Task<EntityEntry<Activity>> LogDeleteCardAsync(string cardName, int cardId, string listName, int boardId)
        {
            var activity = new Activity
            {
                CardName = cardName,
                CardId = cardId,
                BoardId = boardId,
                ActivityName = "deleted",
                Previous = cardName,
                Updated = "",
                Date = DateTime.Now,
                ListName = listName
            };

            return await _context.LoggedActivities.AddAsync(activity);
        }

        public async Task<EntityEntry<Activity>> LogMoveCardAsync(string cardName, int cardId, string previousList, string newList, int boardId)
        {
            var activity = new Activity
            {
                CardName = cardName,
                CardId = cardId,
                BoardId = boardId,
                ActivityName = "moved",
                Previous = previousList,
                Updated = newList,
                Date = DateTime.Now,
            };

            return await _context.LoggedActivities.AddAsync(activity);
        }

        public void Update(Activity activity)
        {
            _context.Entry(activity).State = EntityState.Modified;
        }
    }
}