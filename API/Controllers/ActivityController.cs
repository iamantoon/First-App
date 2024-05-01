using Microsoft.AspNetCore.Mvc;
using API.Interfaces;
using API.DTOs;

namespace API.Controllers
{
    public class ActivityController : BaseApiController
    {
        private readonly ILogActivityRepository _logActivityRepository;
        private readonly ICardRepository _cardRepository;
        public ActivityController(ILogActivityRepository logActivityRepository, ICardRepository cardRepository)
        {
            _logActivityRepository = logActivityRepository;
            _cardRepository = cardRepository;
        }

        [HttpGet]
        public async Task<ActionResult<ActivityResponseDto>> GetActivities(int pageSize = 20)
        {
            var activities = await _logActivityRepository.GetActivitiesAsync(pageSize);

            return Ok(activities);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<ActivityDto>>> GetActivitesByCardId(int id)
        {
            var card = await _cardRepository.FindCardByIdAsync(id);

            var activities = await _logActivityRepository.GetActivitiesByCardNameAsync(card.Name);

            return Ok(activities);
        }
    }
}