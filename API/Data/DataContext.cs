using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options){}

        public DbSet<AppBoard> Boards { get; set; }
        public DbSet<AppList> Lists { get; set; }
        public DbSet<Card> Cards { get; set; }
        public DbSet<Activity> LoggedActivities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AppList>()
                .HasMany(list => list.Cards)        
                .WithOne(card => card.AppList)      
                .HasForeignKey(card => card.AppListId); 

            modelBuilder.Entity<AppBoard>()
                .HasMany(board => board.Cards)        
                .WithOne(card => card.AppBoard)      
                .HasForeignKey(card => card.AppBoardId); 
        }
    }
}