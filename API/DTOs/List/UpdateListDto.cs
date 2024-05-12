using System.ComponentModel.DataAnnotations;

namespace API.DTOs.List
{
    public class UpdateListDto
    {
        [Required] 
        [Range(1, int.MaxValue, ErrorMessage = "Invalid Id")] 
        public int Id { get; set; }
        [Required] 
        [RegularExpression(@"^[a-zA-Z\s]*$", ErrorMessage = "List name must contain only letters")]
        [MinLength(3, ErrorMessage = "Name must be longer than 2 characters")] 
        public string Name { get; set; }
    }
}