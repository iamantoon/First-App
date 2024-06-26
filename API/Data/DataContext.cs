using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options){}

        public DbSet<AppList> Lists { get; set; }
        public DbSet<Card> Cards { get; set; }
        public DbSet<Activity> LoggedActivities { get; set; }
    }
}