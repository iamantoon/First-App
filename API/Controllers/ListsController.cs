using Microsoft.AspNetCore.Mvc;
using API.Interfaces;
using API.Entities;
using API.DTOs.List;

namespace API.Controllers
{
    public class ListsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public ListsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<ListToReturnDto>>> GetListsByBoardId(int boardId)
        {
            var lists = await _unitOfWork.ListRepository.GetListsAsync(boardId);
            var listNames = await _unitOfWork.ListRepository.GetNamesOfListsAsync(boardId);

            return Ok(new {lists, listNames}); 
        }

        [HttpPost]
        public async Task<ActionResult<CreateListDto>> CreateList(CreateListDto createListDto)
        {
            if (await _unitOfWork.ListRepository.ListExistsAsync(createListDto.Name, createListDto.BoardId))
            {
                return Conflict("This list already exists on this board");
            }

            var newList = new AppList
            {
                Name = createListDto.Name,
                Cards = new List<Card>(),
                AppBoardId = createListDto.BoardId
            };

            await _unitOfWork.ListRepository.CreateListAsync(newList);

            if (_unitOfWork.HasChanges())
            {
                await _unitOfWork.Complete();
                return CreatedAtAction(nameof(GetList), new { id = newList.Id }, new { id = newList.Id, name = newList.Name, boardId = newList.AppBoardId });
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

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update list");
        }

        [HttpGet("/list/{id}")]
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