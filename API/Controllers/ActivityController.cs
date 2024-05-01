using Microsoft.AspNetCore.Mvc;
using API.Interfaces;
using API.DTOs;

namespace API.Controllers
{
    public class ActivityController : BaseApiController
    {
        private readonly ILogActivityRepository _logActivityRepository;
        public ActivityController(ILogActivityRepository logActivityRepository)
        {
            _logActivityRepository = logActivityRepository;
        }

        [HttpGet]
        public async Task<ActionResult<ActivityResponseDto>> GetActivities(int pageSize = 20)
        {
            var activities = await _logActivityRepository.GetActivitiesAsync(pageSize);

            return Ok(activities);
        }
    }
}