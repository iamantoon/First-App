using API.DTOs.List;

namespace API.DTOs.Board
{
    public class BoardDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<ListDto> Lists { get; set; }
    }
}