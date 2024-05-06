using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

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

        public async Task<ActivityResponseDto> GetActivitiesAsync(int pageSize)
        {
            var activities = await _context.LoggedActivities
                .Take(pageSize)
                .OrderByDescending(a => a.Date)
                .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            var totalCount = await _context.LoggedActivities.CountAsync();

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

        public async Task<EntityEntry<Activity>> LogChangeDescriptionAsync(string cardName, int cardId, string previousDescription, string newDescription)
        {
            var activity = new Activity
            {
                CardName = cardName,
                CardId = cardId,
                ActivityName = "changed the description",
                Previous = previousDescription,
                Updated = newDescription,
                Date = DateTime.Now,
            };

            return await _context.LoggedActivities.AddAsync(activity);
        }

        public async Task<EntityEntry<Activity>> LogChangeDueDateAsync(string cardName, int cardId, DateOnly previousDate, DateOnly newDate)
        {
            var activity = new Activity
            {
                CardName = cardName,
                CardId = cardId,
                ActivityName = "changed the date",
                Previous = Convert.ToString(previousDate),
                Updated = Convert.ToString(newDate),
                Date = DateTime.Now,
            };

            return await _context.LoggedActivities.AddAsync(activity);
        }

        public async Task<EntityEntry<Activity>> LogChangeNameAsync(int cardId, string cardName, string newName)
        {
            var activity = new Activity
            {
                CardName = cardName,
                CardId = cardId,
                ActivityName = "renamed",
                Previous = cardName,
                Updated = newName,
                Date = DateTime.Now,
            };

            return await _context.LoggedActivities.AddAsync(activity);
        }

        public async Task<EntityEntry<Activity>> LogChangePriorityAsync(string cardName, int cardId, string previousPriority, string newPriority)
        {
            var activity = new Activity
            {
                CardName = cardName,
                CardId = cardId,
                ActivityName = "changed the priority",
                Previous = previousPriority,
                Updated = newPriority,
                Date = DateTime.Now,
            };

            return await _context.LoggedActivities.AddAsync(activity);
        }

        public async Task<EntityEntry<Activity>> LogCreateCardAsync(string cardName, int cardId, string listName)
        {
            var activity = new Activity
            {
                CardName = cardName,
                CardId = cardId,
                ActivityName = "added",
                Previous = "",
                Updated = cardName,
                Date = DateTime.Now,
                ListName = listName
            };

            return await _context.LoggedActivities.AddAsync(activity);
        }

        public async Task<EntityEntry<Activity>> LogDeleteCardAsync(string cardName, int cardId, string listName)
        {
            var activity = new Activity
            {
                CardName = cardName,
                CardId = cardId,
                ActivityName = "deleted",
                Previous = cardName,
                Updated = "",
                Date = DateTime.Now,
                ListName = listName
            };

            return await _context.LoggedActivities.AddAsync(activity);
        }

        public async Task<EntityEntry<Activity>> LogMoveCardAsync(string cardName, int cardId, string previousList, string newList)
        {
            var activity = new Activity
            {
                CardName = cardName,
                CardId = cardId,
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