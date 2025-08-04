using Xunit;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FluentAssertions;

public class BotControllerTests
{
    private ApplicationDbContext CreateInMemoryContext()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()) // Novo banco por teste
            .Options;

        return new ApplicationDbContext(options);
    }

    [Fact]
    public async Task CreateBot_ShouldAddBotToDatabase()
    {
        // Arrange
        var context = CreateInMemoryContext();
        var controller = new BotController(context);

        var dto = new CreateBotDto
        {
            Name = "Test Bot",
            Context = "Helpful assistant"
        };

        // Act
        var result = await controller.CreateBot(dto);

        // Assert
        result.Should().BeOfType<OkObjectResult>();

        var okResult = result as OkObjectResult;
        okResult?.Value.Should().BeOfType<Bot>();

        var bot = okResult?.Value as Bot;
        bot?.Name.Should().Be("Test Bot");

        context.Bots.Count().Should().Be(1);
    }

    [Fact]
    public async Task GetBots_ShouldReturnAllBots()
    {
        // Arrange
        var context = CreateInMemoryContext();
        context.Bots.Add(new Bot { Name = "Bot A", Context = "A" });
        context.Bots.Add(new Bot { Name = "Bot B", Context = "B" });
        await context.SaveChangesAsync();

        var controller = new BotController(context);

        // Act
        var result = await controller.GetBots();

        // Assert
        result.Should().BeOfType<OkObjectResult>();

        var okResult = result as OkObjectResult;
        var bots = okResult?.Value as List<Bot>;

        bots.Should().NotBeNull();
        bots?.Count.Should().Be(2);
    }
}
