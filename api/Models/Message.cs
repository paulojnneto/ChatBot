public class Message
{
    public int Id { get; set; }
    public int BotId { get; set; }
    public Bot Bot { get; set; }

    public string UserMessage { get; set; }
    public string BotResponse { get; set; }

    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}