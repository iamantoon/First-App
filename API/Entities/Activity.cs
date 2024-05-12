namespace API.Entities
{
    public class Activity
    {
        public int Id { get; set; }
        public string CardName { get; set; }
        public int CardId { get; set; }
        public int BoardId { get; set; }
        public string ActivityName { get; set; }
        public string ListName { get; set; }
        public string Previous { get; set; }
        public string Updated { get; set; }
        public DateTime Date { get; set; }
    }
}