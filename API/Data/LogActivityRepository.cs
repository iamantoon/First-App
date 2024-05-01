using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

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

        public async Task<bool> LogChangeDescriptionAsync(string cardName, string previousDescription, string newDescription)
        {
            var activity = new Activity
            {
                CardName = cardName,
                ActivityName = "changed the description",
                Previous = previousDescription,
                Updated = newDescription,
                Date = DateTime.Now,
            };

            await _context.LoggedActivities.AddAsync(activity);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> LogChangeDueDateAsync(string cardName, DateOnly previousDate, DateOnly newDate)
        {
            var activity = new Activity
            {
                CardName = cardName,
                ActivityName = "changed the date",
                Previous = Convert.ToString(previousDate),
                Updated = Convert.ToString(newDate),
                Date = DateTime.Now,
            };

            await _context.LoggedActivities.AddAsync(activity);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> LogChangeNameAsync(string cardName, string newName)
        {
            var activity = new Activity
            {
                CardName = cardName,
                ActivityName = "renamed",
                Previous = cardName,
                Updated = newName,
                Date = DateTime.Now,
            };

            await _context.LoggedActivities.AddAsync(activity);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> LogChangePriorityAsync(string cardName, string previousPriority, string newPriority)
        {
            var activity = new Activity
            {
                CardName = cardName,
                ActivityName = "changed the priority",
                Previous = previousPriority,
                Updated = newPriority,
                Date = DateTime.Now,
            };

            await _context.LoggedActivities.AddAsync(activity);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> LogCreateCardAsync(string cardName, string listName)
        {
            var activity = new Activity
            {
                CardName = cardName,
                ActivityName = "added",
                Previous = "",
                Updated = cardName,
                Date = DateTime.Now,
                ListName = listName
            };

            await _context.LoggedActivities.AddAsync(activity);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> LogDeleteCardAsync(string cardName, string listName)
        {
            var activity = new Activity
            {
                CardName = cardName,
                ActivityName = "deleted",
                Previous = cardName,
                Updated = "",
                Date = DateTime.Now,
                ListName = listName
            };

            await _context.LoggedActivities.AddAsync(activity);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> LogMoveCardAsync(string cardName, string previousList, string newList)
        {
            var activity = new Activity
            {
                CardName = cardName,
                ActivityName = "moved",
                Previous = previousList,
                Updated = newList,
                Date = DateTime.Now,
            };

            await _context.LoggedActivities.AddAsync(activity);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Activity activity)
        {
            _context.Entry(activity).State = EntityState.Modified;
        }
    }
}