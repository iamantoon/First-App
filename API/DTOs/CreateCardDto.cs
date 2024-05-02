using System.ComponentModel.DataAnnotations;
using API.Helpers;

namespace API.DTOs
{
    public class CreateCardDto
    {
        [Required] 
        [MaxLength(25, ErrorMessage = "Name must be no more than 25 characters")]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required] 
        [ValidDate]
        public DateOnly DueDate { get; set; }
        [Required] 
        [RegularExpressionValidator]
        public string Priority { get; set; }
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Invalid ListId")]
        public int ListId { get; set; }
    }
}