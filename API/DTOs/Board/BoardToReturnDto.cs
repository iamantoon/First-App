namespace API.DTOs.Board
{
    public class BoardToReturnDto
    {
        public List<BoardDto> Bords { get; set; }
        public List<BoardNamesDto> BoardNames { get; set; }
    }
}