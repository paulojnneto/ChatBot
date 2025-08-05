using ChatBotAPI.DTOs;
using System.Text.Json;
using Xunit;

public class CreateBotDtoTests
{
  [Fact]
  public void CreateBotDto_Should_Set_Properties_Correctly()
  {
    var dto = new CreateBotDto
    {
      Name = "TestBot",
      Context = "Be polite"
    };

    Assert.Equal("TestBot", dto.Name);
    Assert.Equal("Be polite", dto.Context);
  }

  [Fact]
  public void CreateBotDto_Should_Serialize_And_Deserialize_Correctly()
  {
    var dto = new CreateBotDto
    {
      Name = "SerializableBot",
      Context = "Friendly"
    };

    var json = JsonSerializer.Serialize(dto);
    var deserialized = JsonSerializer.Deserialize<CreateBotDto>(json);

    Assert.NotNull(deserialized);
    Assert.Equal(dto.Name, deserialized.Name);
    Assert.Equal(dto.Context, deserialized.Context);
  }
}
