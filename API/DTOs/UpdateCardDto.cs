using System.ComponentModel.DataAnnotations;
using API.Helpers;

namespace API.DTOs
{
    public class UpdateCardDto
    {
        [Required] 
        [Range(1, int.MaxValue, ErrorMessage = "Invalid Id")]
        public int Id { get; set; } 

        [MaxLength(25, ErrorMessage = "Name must be no more than 25 characters")]
        public string Name { get; set; }

        [MaxLength(225, ErrorMessage = "Description must be no more than 225 characters")]
        public string Description { get; set; }

        [ValidDate(ErrorMessage = "Invalid date")]
        public DateOnly DueDate { get; set; }

        [RegularExpressionValidator]
        public string Priority { get; set; }

        [ListIdValidator(ErrorMessage = "Invalid ListId")]
        public int ListId { get; set; }
    }
}