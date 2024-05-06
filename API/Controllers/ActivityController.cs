using Microsoft.AspNetCore.Mvc;
using API.Interfaces;
using API.DTOs;

namespace API.Controllers
{
    public class ActivityController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public ActivityController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<ActivityResponseDto>> GetActivities(int pageSize = 20)
        {
            var activities = await _unitOfWork.LogActivityRepository.GetActivitiesAsync(pageSize);

            return Ok(activities);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<ActivityDto>>> GetActivitesByCardId(int id)
        {
            var activities = await _unitOfWork.LogActivityRepository.GetActivitiesByCardIdAsync(id);

            return Ok(activities);
        }
    }
}