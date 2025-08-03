public class Bot
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Context { get; set; }

    public List<Message> Messages { get; set; } = new();
}