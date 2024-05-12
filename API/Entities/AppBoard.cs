namespace API.Entities
{
    public class AppBoard
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<AppList> Lists { get; set; } = new();
        public List<Card> Cards { get; set; } = new();
    }
} 