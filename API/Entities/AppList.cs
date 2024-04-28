namespace API.Entities
{
    public class AppList
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Card> Cards { get; set; } = new();
    }
}