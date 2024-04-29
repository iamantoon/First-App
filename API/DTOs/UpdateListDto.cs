using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class UpdateListDto
    {
        [Required] [Range(1, int.MaxValue, ErrorMessage = "Invalid Id.")] public int Id { get; set; }
        [Required] public string Name { get; set; }
    }
}