using ChatBotAPI.DTOs;
using System.Text.Json;
using Xunit;

public class SendMessageDtoTests
{
  [Fact]
  public void SendMessageDto_Should_Set_Properties_Correctly()
  {
    var dto = new SendMessageDto
    {
      BotId = 1,
      UserMessage = "Hello, world!"
    };

    Assert.Equal(1, dto.BotId);
    Assert.Equal("Hello, world!", dto.UserMessage);
  }

  [Fact]
  public void SendMessageDto_Should_Serialize_And_Deserialize_Correctly()
  {
    var dto = new SendMessageDto
    {
      BotId = 42,
      UserMessage = "Serialize me!"
    };

    var json = JsonSerializer.Serialize(dto);
    var deserialized = JsonSerializer.Deserialize<SendMessageDto>(json);

    Assert.NotNull(deserialized);
    Assert.Equal(dto.BotId, deserialized.BotId);
    Assert.Equal(dto.UserMessage, deserialized.UserMessage);
  }
}
