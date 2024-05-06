using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ListsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public ListsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ListToReturnDto>>> GetLists()
        {
            var lists = await _unitOfWork.ListRepository.GetListsAsync();
            var listNames = await _unitOfWork.ListRepository.GetNamesOfListsAsync();

            return Ok(new {lists, listNames}); 
        }

        [HttpPost]
        public async Task<ActionResult<CreateListDto>> CreateList(CreateListDto createListDto)
        {
            if (await _unitOfWork.ListRepository.ListExists(createListDto.Name))
            {
                return Conflict("This list already exists");
            }

            var newList = new AppList
            {
                Name = createListDto.Name,
                Cards = new List<Card>()
            };

            await _unitOfWork.ListRepository.CreateListAsync(newList);

            if (_unitOfWork.HasChanges())
            {
                await _unitOfWork.Complete();
                return CreatedAtAction(nameof(GetList), new { id = newList.Id }, createListDto); // 201 Created
            }
            else
            {
                return BadRequest("Failed to create list");
            }
        }


        [HttpPatch]
        public async Task<ActionResult> UpdateList(UpdateListDto updateListDto)
        {
            var list = await _unitOfWork.ListRepository.FindListByIdAsync(updateListDto.Id);

            if (list == null) return NotFound();

            list.Name = updateListDto.Name;

            if (await _unitOfWork.Complete()) return NoContent(); // 204

            return BadRequest("Failed to update list");
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ListDto>> GetList(int id)
        {
            var list = await _unitOfWork.ListRepository.GetListByIdAsync(id);
            if (list == null)
            {
                return NotFound("List not found");
            }
            return Ok(list);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteList(int id)
        {
            var listToDelete = await _unitOfWork.ListRepository.FindListByIdAsync(id);

            if (listToDelete == null) return NotFound();
                
            _unitOfWork.ListRepository.DeleteList(listToDelete);

            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Failed to delete list");
        }
    }
}