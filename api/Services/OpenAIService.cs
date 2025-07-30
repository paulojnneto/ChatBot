using System.Net.Http;
using System.Text;
using Newtonsoft.Json;

public class OpenAIService
{
    private readonly string _apiKey;
    private readonly HttpClient _httpClient;

    public OpenAIService(IConfiguration config)
    {
        _apiKey = config["OpenAI:ApiKey"];
        _httpClient = new HttpClient();
    }

    public async Task<string> GetResponseAsync(string context, List<(string role, string content)> messages)
    {
        var apiUrl = "https://api.openai.com/v1/chat/completions";

        var requestBody = new
        {
            model = "gpt-3.5-turbo",
            messages = messages
                .Select(m => new { role = m.role, content = m.content })
                .Prepend(new { role = "system", content = context }),
            temperature = 0.7,
            max_tokens = 200
        };

        var request = new HttpRequestMessage(HttpMethod.Post, apiUrl);
        request.Headers.Add("Authorization", $"Bearer {_apiKey}");
        request.Content = new StringContent(JsonConvert.SerializeObject(requestBody), Encoding.UTF8, "application/json");

        var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();
        var result = await response.Content.ReadAsStringAsync();

        dynamic json = JsonConvert.DeserializeObject(result);
        return json.choices[0].message.content;
    }
}
