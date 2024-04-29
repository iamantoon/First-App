namespace API.DTOs
{
    public class ListToReturnDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<CardDto> Cards { get; set; }
        public List<ListNamesDto> ListNames { get; set; }
    }
}