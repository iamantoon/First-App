using System.ComponentModel.DataAnnotations;
using API.Helpers;

namespace API.DTOs
{
    public class UpdateCardDto
    {
        [Required] 
        [Range(1, int.MaxValue, ErrorMessage = "Invalid Id.")]
        public int Id { get; set; } 
        [MaxLength(25, ErrorMessage = "Name must be no more than 25 characters.")]
        public string Name { get; set; }
        public string Description { get; set; }
        [FutureDate(ErrorMessage = "Due date must be provided and in the future.")]
        public DateOnly DueDate { get; set; }
        [RegularExpression("^(Low|Medium|High)$", ErrorMessage = "Priority must be Low, Medium, or High.")]
        public string Priority { get; set; }
        
        [Range(1, int.MaxValue, ErrorMessage = "Invalid ListId.")]
        public int ListId { get; set; }
    }
}