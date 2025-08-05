using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ChatBotAPI.Data;
using ChatBotAPI.DTOs;
using ChatBotAPI.Models;

namespace ChatBotAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MessageController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IOpenAIService _openAi;

    public MessageController(ApplicationDbContext context, IOpenAIService openAi)
    {
        _context = context;
        _openAi = openAi;
    }

    [HttpPost]
    public async Task<IActionResult> SendMessage(SendMessageDto dto)
    {
        var bot = await _context.Bots.Include(b => b.Messages).FirstOrDefaultAsync(b => b.Id == dto.BotId);
        if (bot == null) return NotFound("Bot not found");

        var messages = bot.Messages
            .Select(m => new (string role, string content)[]
            {
                ("user", m.UserMessage),
                ("assistant", m.BotResponse)
            })
            .SelectMany(x => x)
            .ToList();

        messages.Add(("user", dto.UserMessage));
        var response = await _openAi.GetResponseAsync(bot.Context, messages);

        var msg = new Message
        {
            BotId = bot.Id,
            UserMessage = dto.UserMessage,
            BotResponse = response
        };

        _context.Messages.Add(msg);
        await _context.SaveChangesAsync();

        return Ok(new { response });
    }

    [HttpGet("{botId}")]
    public async Task<IActionResult> GetMessages(int botId)
    {
        var messages = await _context.Messages
            .Where(m => m.BotId == botId)
            .OrderBy(m => m.Timestamp)
            .ToListAsync();

        return Ok(messages);
    }
}
