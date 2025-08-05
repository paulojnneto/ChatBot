using ChatBotAPI.Data;
using ChatBotAPI.DTOs;
using ChatBotAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class BotController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public BotController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> CreateBot(CreateBotDto dto)
    {
        var bot = new Bot { Name = dto.Name, Context = dto.Context };
        _context.Bots.Add(bot);
        await _context.SaveChangesAsync();

        return Ok(bot);
    }

    [HttpGet]
    public async Task<IActionResult> GetBots()
    {
        return Ok(await _context.Bots.ToListAsync());
    }
}
