#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { 
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

// Define input schemas for validation
const GetWeatherArgsSchema = z.object({
  city: z.string().describe("The city to get weather for"),
  units: z.enum(["metric", "imperial"]).optional().describe("Temperature units")
});

// Create the MCP server
const server = new Server({
  name: "weather-server",
  version: "1.0.0"
}, {
  capabilities: {
    tools: {}
  }
});

// Add tools to the server
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_weather",
        description: "Get current weather information for a city",
        inputSchema: {
          type: "object",
          properties: {
            city: {
              type: "string",
              description: "The city to get weather for"
            },
            units: {
              type: "string",
              enum: ["metric", "imperial"],
              description: "Temperature units (metric or imperial)",
              default: "metric"
            }
          },
          required: ["city"]
        }
      },
      {
        name: "get_time",
        description: "Get the current time",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      }
    ]
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request: any) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "get_weather": {
        const parsed = GetWeatherArgsSchema.parse(args);
        
        // Using OpenWeatherMap API (you'll need an API key)
        // For demo purposes, we'll return mock data
        const weatherData = {
          city: parsed.city,
          temperature: Math.round(Math.random() * 30 + 10),
          description: "Partly cloudy",
          humidity: Math.round(Math.random() * 100),
          units: parsed.units || "metric"
        };

        return {
          content: [
            {
              type: "text",
              text: `Weather in ${weatherData.city}:
Temperature: ${weatherData.temperature}°${weatherData.units === "metric" ? "C" : "F"}
Conditions: ${weatherData.description}
Humidity: ${weatherData.humidity}%`
            }
          ]
        };
      }

      case "get_time": {
        const currentTime = new Date().toISOString();
        return {
          content: [
            {
              type: "text",
              text: `Current time: ${currentTime}`
            }
          ]
        };
      }

      default:
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Tool ${name} not found`
        );
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new McpError(
        ErrorCode.InvalidParams,
        `Invalid parameters: ${error.message}`
      );
    }
    throw error;
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});