# AI ChatBot Interface

This is a web application that allows users to create and interact with multiple AI-powered chatbots. Each bot is created with a custom context (system prompt) and can be used in an interactive chat interface similar to ChatGPT or Messenger.

## 🛠️ Technologies Used

### Frontend

- **React 19**
- **TypeScript**
- **Vite** – Fast bundler and development server.
- **Chakra UI** – Component library for accessible and composable UI.
- **Axios** – Promise-based HTTP client for API communication.

### Backend

- **.NET 6+ Web API**
- **Entity Framework Core** – For database persistence.
- **OpenAI API** – Used to process user messages with a contextual chatbot behavior.
- **CORS** and **JSON serialization** configured for cross-origin and API communication.

---

## 📂 Project Structure

```
chatbot/
  ├── api/
  │   │
  │   ├── Controllers/
  │   │ ├── BotsController.cs
  │   │ └── MessagesController.cs
  │   ├── Data/
  │   │ └── ApplicationDbContext.cs
  │   ├── Dtos/
  │   │ ├── BotCreateDto.cs
  │   │ ├── BotDto.cs
  │   │ ├── MessageCreateDto.cs
  │   │ └── MessageDto.cs
  │   ├── Entities/
  │   │ ├── Bot.cs
  │   │ └── Message.cs
  │   ├── Interfaces/
  │   │ ├── IBotService.cs
  │   │ └── IMessageService.cs
  │   ├── Mappings/
  │   │ └── MappingProfile.cs
  │   ├── Middlewares/
  │   │ └── ExceptionMiddleware.cs
  │   ├── Services/
  │   │ ├── BotService.cs
  │   │ └── MessageService.cs
  │   ├── Program.cs
  │   ├── appsettings.json
  │   ├── api.csproj
  │   └── Dockerfile
  └──frontend/
      │
      ├── src/
      │   ├── components/    
      │   │ ├── Sidebar.tsx
      │   │ ├── ChatMessages.tsx
      │   │ ├── MessageInputBar.tsx
      │   │ ├── CreateBotModal.tsx
      │   │ └── ui/ CHAKRA compoentes created automatically.    
      │   ├── hooks/
      │   │ └── useChatBot.ts
      │   ├── services/
      │   │ └── api.ts
      │   ├── types/
      │   │ └── interfaces.ts
      │   ├── views/
      │   │ └── ChatPage.tsx
      │   ├── App.tsx
      │   └── main.tsx
      ├── public/
      ├── index.html
      ├── package.json
      └──Dockerfile
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later)
- [.NET 6 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)

---

## 🚀 Running the project with docker
```bash
docker-compose up --build
```

### 🖥️ Running the frontend individually

```bash
cd frontend
npm install
npm run dev
```

The app will be available at: [http://localhost:5173](http://localhost:5173)

---

### 🔧 Running the Backend (.NET API) individually

Assuming your backend project is in `backend/` folder:

```bash
cd backend
dotnet restore
dotnet ef database update  # if using EF Core migrations
dotnet run
```

API should run by default at: `http://localhost:5260`

---

### 💬 API Example (Bot Creation)

Here’s a `curl` example of how to create a bot via the API:

```bash
curl --location 'http://localhost:5260/api/Bot' \
--header 'Content-Type: application/json' \
--data '{
  "name": "AtendenteGPT",
  "context": "Você é um assistente de vendas simpático"
}'
```

---

## ⚙️ Environment Configuration (Optional)

You can set up `.env` files to store configuration like API base URLs.

**Example: `.env`**

```
VITE_API_BASE_URL=http://localhost:5260
```

Make sure to load this variable in Axios or wherever appropriate in your frontend.

---

## 📌 Features

- ✅ Create bots with custom instructions
- ✅ Chat interface with auto-scroll
- ✅ Sidebar with independent scroll
- ✅ Modal to add new bots
- ✅ Support for `Enter` key message sending
- ✅ Chakra UI for styling
- ✅ Fixed message input bar at bottom
- ✅ Each message includes both user and bot responses

---

## 📷 UI Overview

- Left panel: List of bots and "Create New Bot" button
- Right panel: Chat with selected bot
- Modal: Appears when creating a new bot
- Dark theme UI by default
