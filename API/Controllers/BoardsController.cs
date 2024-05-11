using Microsoft.AspNetCore.Mvc;
using API.Interfaces;
using API.DTOs.Board;
using API.Entities;

namespace API.Controllers
{
    public class BoardsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public BoardsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<BoardNamesDto>> GetBoards()
        {
            var boardNames = await _unitOfWork.BoardRepository.GetNamesOfBoardsAsync();

            return Ok(boardNames); 
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<BoardDto>> GetBoard(int id)
        {
            var board = await _unitOfWork.BoardRepository.GetBoardByIdAsync(id);

            if (board == null)
            {
                return NotFound("Board not found");
            }

            return Ok(board);
        }

        [HttpPost]
        public async Task<ActionResult<object>> CreateBoard(CreateBoardDto createBoardDto)
        {
            if (await _unitOfWork.BoardRepository.BoardExists(createBoardDto.Name))
            {
                return Conflict("The board with this name already exists");
            }

            var newBoard = new AppBoard
            {
                Name = createBoardDto.Name,
                Lists = new List<AppList>()
            };

            await _unitOfWork.BoardRepository.CreateBoardAsync(newBoard); 

            await _unitOfWork.Complete();

            if (newBoard.Id > 0)
            {
                return CreatedAtAction(nameof(GetBoard), new { id = newBoard.Id }, new { id = newBoard.Id, name = newBoard.Name });
            }
            else
            {
                return BadRequest("Failed to create board");
            }
        }

        [HttpPatch]
        public async Task<ActionResult> UpdateBoard(UpdateBoardDto updateBoardDto)
        {
            var board = await _unitOfWork.BoardRepository.FindBoardByIdAsync(updateBoardDto.Id);

            if (board == null) return NotFound();

            board.Name = updateBoardDto.Name;

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update board");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteBoard(int id)
        {
            var boardToDelete = await _unitOfWork.BoardRepository.FindBoardByIdAsync(id);

            if (boardToDelete == null) return NotFound();
                
            _unitOfWork.BoardRepository.DeleteBoard(boardToDelete);

            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Failed to delete board");
        }
    }
}