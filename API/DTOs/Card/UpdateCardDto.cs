using System.ComponentModel.DataAnnotations;
using API.Helpers;

namespace API.DTOs.Card
{
    public class UpdateCardDto
    {
        [Required] 
        [Range(1, int.MaxValue, ErrorMessage = "Invalid Id")]
        public int Id { get; set; } 

        [MaxLength(55, ErrorMessage = "Name must be no more than 55 characters")]
        public string Name { get; set; }

        [MaxLength(285, ErrorMessage = "Description must be no more than 285 characters")]
        public string Description { get; set; }

        [ValidDate(ErrorMessage = "Invalid date")]
        public DateOnly DueDate { get; set; }

        [RegularExpressionValidator]
        public string Priority { get; set; }

        [CustomIdValidator(ErrorMessage = "Invalid ListId")]
        public int ListId { get; set; }
        [CustomIdValidator(ErrorMessage = "Invalid BoardId")]
        public int BoardId { get; set; }
    }
}