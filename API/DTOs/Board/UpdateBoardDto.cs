using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Board
{
    public class UpdateBoardDto
    {
        [Required] 
        [Range(1, int.MaxValue, ErrorMessage = "Invalid board Id")] 
        public int Id { get; set; }
        [Required] 
        [MinLength(3, ErrorMessage = "Name must be longer than 2 characters")] 
        public string Name { get; set; }
    }
}