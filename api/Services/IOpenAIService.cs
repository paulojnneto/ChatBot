using System.Collections.Generic;
using System.Threading.Tasks;

public interface IOpenAIService
{
  Task<string> GetResponseAsync(string message, List<(string role, string content)> messages);
}

