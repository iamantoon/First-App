using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Board
{
    public class CreateBoardDto
    {
        [Required] 
        [MinLength(4, ErrorMessage = "Board name must be longer than 3 characters")]
        public string Name { get; set; }
    }
}