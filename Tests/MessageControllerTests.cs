
using Moq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatBotAPI.Controllers;
using ChatBotAPI.Data;
using ChatBotAPI.DTOs;
using ChatBotAPI.Models;
using ChatBotAPI.Services;

public class MessageControllerTests
{
    private ApplicationDbContext GetInMemoryDbContext()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: System.Guid.NewGuid().ToString())
            .Options;
        return new ApplicationDbContext(options);
    }

    private IOpenAIService GetMockOpenAIService(string response = "Test response")
    {
        var mock = new Mock<IOpenAIService>();
        mock.Setup(service => service.GetResponseAsync(
            It.IsAny<string>(),
            It.IsAny<List<(string role, string content)>>()))
            .ReturnsAsync(response);
        return mock.Object;
    }


    [Fact]
    public async Task SendMessage_ReturnsResponseAndStoresMessage()
    {
        // Arrange
        var db = GetInMemoryDbContext();
        var bot = new Bot { Id = 1, Name = "TestBot", Context = "Be polite" };
        db.Bots.Add(bot);
        await db.SaveChangesAsync();

        var controller = new MessageController(db, GetMockOpenAIService());

        var dto = new SendMessageDto { BotId = bot.Id, UserMessage = "Hello" };

        // Act
        var result = await controller.SendMessage(dto);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var responseObj = Moq.It.IsAny<object>();
        Assert.NotNull(okResult.Value);

        var messageInDb = db.Messages.FirstOrDefault(m => m.BotId == bot.Id);
        Assert.NotNull(messageInDb);
        Assert.Equal("Hello", messageInDb.UserMessage);
        Assert.Equal("Test response", messageInDb.BotResponse);
    }

    [Fact]
    public async Task SendMessage_ReturnsNotFound_IfBotDoesNotExist()
    {
        // Arrange
        var db = GetInMemoryDbContext();
        var controller = new MessageController(db, GetMockOpenAIService());

        var dto = new SendMessageDto { BotId = 999, UserMessage = "Hi" };

        // Act
        var result = await controller.SendMessage(dto);

        // Assert
        Assert.IsType<NotFoundObjectResult>(result);
    }

    [Fact]
    public async Task GetMessages_ReturnsOrderedMessagesForBot()
    {
        // Arrange
        var db = GetInMemoryDbContext();
        db.Messages.AddRange(
            new Message { BotId = 1, UserMessage = "A", BotResponse = "R1", Timestamp = new System.DateTime(2023, 1, 1) },
            new Message { BotId = 1, UserMessage = "B", BotResponse = "R2", Timestamp = new System.DateTime(2023, 1, 2) }
        );
        await db.SaveChangesAsync();

        var controller = new MessageController(db, GetMockOpenAIService());

        // Act
        var result = await controller.GetMessages(1);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var messages = Assert.IsType<List<Message>>(okResult.Value);
        Assert.Equal(2, messages.Count);
        Assert.Equal("A", messages[0].UserMessage);
        Assert.Equal("B", messages[1].UserMessage);
    }
}
