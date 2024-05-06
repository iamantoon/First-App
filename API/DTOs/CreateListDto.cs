using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CreateListDto
    {
        [Required] 
        [RegularExpression(@"^[a-zA-Z\s]*$", ErrorMessage = "List name must contain only letters")]
        [MinLength(3, ErrorMessage = "List name must be longer than 2 characters")] 
        public string Name { get; set; }
    }
}