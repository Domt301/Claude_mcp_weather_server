# Weather MCP Server

A Model Context Protocol (MCP) server that provides weather information and time utilities for AI assistants and applications.

## Overview

This MCP server implements a simple weather service with two main tools:
- **Weather Information**: Get current weather data for any city
- **Time Service**: Retrieve the current timestamp

Built with TypeScript and the official MCP SDK, this server demonstrates how to create custom tools that can be used by Claude Desktop and other MCP-compatible clients.

## Features

- 🌤️ **Weather Data**: Fetch weather information for any city worldwide
- ⏰ **Time Service**: Get current timestamp in ISO format  
- 🔒 **Input Validation**: Robust parameter validation using Zod schemas
- 🚀 **TypeScript**: Full type safety and modern JavaScript features
- 📡 **stdio Transport**: Communicates via standard input/output for seamless integration

## Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-mcp-server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

## Usage

### Development

Run the server in development mode:
```bash
npm run dev
```

### Production

Start the built server:
```bash
npm start
```

### Integration with Claude Desktop

Add this server to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "weather-server": {
      "command": "node",
      "args": ["/path/to/my-mcp-server/build/index.js"]
    }
  }
}
```

## Available Tools

### `get_weather`

Retrieves weather information for a specified city.

**Parameters:**
- `city` (string, required): The city to get weather for
- `units` (string, optional): Temperature units - "metric" or "imperial" (defaults to "metric")

**Example Response:**
```
Weather in London:
Temperature: 18°C
Conditions: Partly cloudy
Humidity: 65%
```

### `get_time`

Returns the current timestamp in ISO 8601 format.

**Parameters:** None

**Example Response:**
```
Current time: 2025-01-08T14:30:25.123Z
```

## Project Structure

```
my-mcp-server/
├── index.ts          # Main server implementation
├── package.json      # Project dependencies and scripts
├── tsconfig.json     # TypeScript configuration
├── build/           # Compiled JavaScript output
└── README.md        # This file
```

## Technical Details

### Dependencies

- **@modelcontextprotocol/sdk**: Official MCP SDK for server implementation
- **axios**: HTTP client for external API calls
- **zod**: Runtime type validation and parsing

### Architecture

The server follows the MCP specification:
1. **Tool Registration**: Tools are registered via `ListToolsRequestSchema` handler
2. **Tool Execution**: Tool calls are handled via `CallToolRequestSchema` handler  
3. **Error Handling**: Proper MCP error codes and validation
4. **Transport**: Uses stdio transport for communication

### Weather Data

Currently returns mock weather data for demonstration purposes. To integrate with a real weather API:

1. Sign up for a weather service (e.g., OpenWeatherMap)
2. Replace the mock data generation in the `get_weather` case
3. Add proper API key handling and HTTP requests

## Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Build and run in development mode
- `npm start` - Run the compiled server

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Build and test (`npm run build`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Learn More

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [MCP SDK Documentation](https://github.com/modelcontextprotocol/typescript-sdk)
- [Claude Desktop MCP Integration](https://claude.ai/docs)

---

Built with ❤️ using TypeScript and the Model Context Protocol