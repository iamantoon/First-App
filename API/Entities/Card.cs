using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Cards")]
    public class Card
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateOnly DueDate { get; set; }
        public string Priority { get; set; }
        
        public int AppListId { get; set; }
        public AppList AppList { get; set; }
    }
}