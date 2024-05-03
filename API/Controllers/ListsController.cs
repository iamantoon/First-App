using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ListsController : BaseApiController
    {
        private readonly IListRepository _listRepository;
        private readonly IMapper _mapper;
        public ListsController(IListRepository listRepository, IMapper mapper)
        {
            _listRepository = listRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ListToReturnDto>>> GetLists()
        {
            var lists = await _listRepository.GetListsAsync();
            var listNames = await _listRepository.GetNamesOfListsAsync();

            return Ok(new {lists, listNames}); 
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ListDto>> GetList(int id)
        {
            var list = await _listRepository.GetListByIdAsync(id);
            if (list == null)
            {
                return NotFound("List not found");
            }
            return Ok(list);
        }

        [HttpPost]
        public async Task<ActionResult<CreateListDto>> CreateList(CreateListDto createListDto)
        {
            if (await _listRepository.ListExists(createListDto.Name))
            {
                return Conflict("This list already exists");
            }

            var newList = new AppList
            {
                Name = createListDto.Name,
                Cards = new List<Card>()
            };

            if (await _listRepository.CreateListAsync(newList))
            {
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
            var list = await _listRepository.FindListByIdAsync(updateListDto.Id);

            if (list == null) return NotFound();

            list.Name = updateListDto.Name;

            if (await _listRepository.SaveAllAsync()) return NoContent(); // 204

            return BadRequest("Failed to update list");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteList(int id)
        {
            var listToDelete = await _listRepository.FindListByIdAsync(id);

            if (listToDelete == null) return NotFound();
                
            _listRepository.DeleteList(listToDelete);

            if (await _listRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to delete list");
        }
    }
}