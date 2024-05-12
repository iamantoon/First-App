namespace API.DTOs.Card
{
    public class CardDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateOnly DueDate { get; set; }
        public string Priority { get; set; }
        public int AppListId { get; set; }
    }
}