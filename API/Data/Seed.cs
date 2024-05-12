using System.Text.Json;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedBoards(DataContext context)
        {
            if (await context.Lists.AnyAsync()) return;

            var data = await File.ReadAllTextAsync("Data/DataSeed.json");

            var options = new JsonSerializerOptions{PropertyNameCaseInsensitive = true};

            var boards = JsonSerializer.Deserialize<List<AppBoard>>(data, options);

            foreach(var board in boards)
            {
                context.Boards.Add(board);
            }

            await context.SaveChangesAsync();
        }
    }
}