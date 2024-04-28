namespace API.DTOs
{
    public class ListDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<CardDto> Cards { get; set; }
    }
}