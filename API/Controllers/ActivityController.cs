using Microsoft.AspNetCore.Mvc;
using API.DTOs.Activity;
using API.Interfaces;

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
        public async Task<ActionResult<ActivityResponseDto>> GetActivities(int boardId, int pageSize = 20)
        {
            var activities = await _unitOfWork.LogActivityRepository.GetActivitiesByBoardIdAsync(boardId, pageSize);

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