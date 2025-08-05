using ChatBotAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ChatBotAPI.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Bot> Bots { get; set; }
    public DbSet<Message> Messages { get; set; }
}
