# =========================
# Build stage
# =========================
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY . .
RUN dotnet publish Inventory.Api/Inventory.Api.csproj -c Release -o /app

# =========================
# Runtime stage
# =========================
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app

COPY --from=build /app .

EXPOSE 3002
ENV ASPNETCORE_URLS=http://0.0.0.0:3002

ENTRYPOINT ["dotnet", "Inventory.Api.dll"]
