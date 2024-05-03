using System.Text.Json;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext context)
        {
            if (await context.Lists.AnyAsync()) return;

            var data = await File.ReadAllTextAsync("Data/DataSeed.json");

            var options = new JsonSerializerOptions{PropertyNameCaseInsensitive = true};

            var lists = JsonSerializer.Deserialize<List<AppList>>(data, options);

            foreach(var list in lists)
            {
                context.Lists.Add(list);
            }

            await context.SaveChangesAsync();
        }
    }
}