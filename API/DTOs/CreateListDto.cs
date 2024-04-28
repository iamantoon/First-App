using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CreateListDto
    {
        [Required] public string Name { get; set; }
    }
}