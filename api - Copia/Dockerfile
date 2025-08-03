FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5000

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY api/*.csproj ./api/
RUN dotnet restore ./api/ChatbotAPI.csproj
COPY api/. ./api/
WORKDIR /src/api
RUN dotnet build ChatbotAPI.csproj -c Release -o /app/build
RUN dotnet publish ChatbotAPI.csproj -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "ChatbotAPI.dll"]
