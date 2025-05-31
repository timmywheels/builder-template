import { FastifyPluginAsync } from "fastify";
import { z } from "zod";

// Type definitions
interface Agent {
  id: string;
  name: string;
  description: string;
  functionality: string;
  status: "draft" | "active" | "paused";
  createdAt: Date;
  updatedAt: Date;
  generatedCode?: string;
  deployments: AgentDeployment[];
}

interface AgentDeployment {
  id: string;
  workerName: string;
  url: string;
  environment: string;
  status: string;
  deployedAt: Date;
  version: string;
}

// Schemas for validation
const CreateAgentSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  functionality: z.string().min(1).max(2000),
  template: z.string().optional(),
});

const DeployAgentSchema = z.object({
  agentId: z.string(),
  workerName: z.string().regex(/^[a-z0-9-]+$/),
  environment: z.enum(["production", "staging", "development"]),
  cloudflareToken: z.string(),
  accountId: z.string(),
  zoneId: z.string().optional(),
});

const UpdateAgentSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().min(1).max(500).optional(),
  functionality: z.string().min(1).max(2000).optional(),
  status: z.enum(["draft", "active", "paused"]).optional(),
});

// Mock data store (in production, this would be a database)
let agents = [
  {
    id: "1",
    name: "Customer Support Bot",
    description: "Handles customer inquiries and provides instant support responses",
    functionality:
      "Answer customer questions about products and services, help with order tracking, handle basic troubleshooting, and escalate complex issues to human agents. Always be polite and helpful.",
    status: "active",
    createdAt: new Date("2024-01-15T10:30:00Z"),
    updatedAt: new Date("2024-01-15T10:30:00Z"),
    deployments: [
      {
        id: "dep-1",
        workerName: "customer-support-bot",
        url: "https://customer-support-bot.your-domain.workers.dev",
        environment: "production",
        status: "deployed",
        deployedAt: new Date("2024-01-15T10:30:00Z"),
        version: "v1.2.3",
      },
    ],
  },
  {
    id: "2",
    name: "Content Moderator",
    description: "Automatically moderates user-generated content for inappropriate material",
    functionality:
      "Review text content for inappropriate language, spam, or harmful content. Flag suspicious content for human review and automatically approve safe content. Maintain a balance between safety and user experience.",
    status: "paused",
    createdAt: new Date("2024-01-14T15:45:00Z"),
    updatedAt: new Date("2024-01-14T15:45:00Z"),
    deployments: [
      {
        id: "dep-2",
        workerName: "content-moderator",
        url: "https://content-moderator.your-domain.workers.dev",
        environment: "production",
        status: "paused",
        deployedAt: new Date("2024-01-14T15:45:00Z"),
        version: "v1.1.0",
      },
    ],
  },
];

let deployments = [
  {
    id: "dep-1",
    agentId: "1",
    workerName: "customer-support-bot",
    url: "https://customer-support-bot.your-domain.workers.dev",
    environment: "production",
    status: "deployed",
    deployedAt: new Date("2024-01-15T10:30:00Z"),
    version: "v1.2.3",
    requests: 1247,
    errors: 3,
    uptime: "99.9%",
  },
  {
    id: "dep-2",
    agentId: "2",
    workerName: "content-moderator",
    url: "https://content-moderator.your-domain.workers.dev",
    environment: "production",
    status: "paused",
    deployedAt: new Date("2024-01-14T15:45:00Z"),
    version: "v1.1.0",
    requests: 892,
    errors: 1,
    uptime: "99.7%",
  },
];

const agentRoutes: FastifyPluginAsync = async (fastify) => {
  // Get all agents
  fastify.get("/", async (request, reply) => {
    return { agents };
  });

  // Get single agent
  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const agent = agents.find((a) => a.id === id);

    if (!agent) {
      return reply.status(404).send({ error: "Agent not found" });
    }

    return { agent };
  });

  // Create new agent
  fastify.post("/", async (request, reply) => {
    const validation = CreateAgentSchema.safeParse(request.body);

    if (!validation.success) {
      return reply.status(400).send({
        error: "Validation failed",
        details: validation.error.errors,
      });
    }

    const { name, description, functionality, template } = validation.data;

    const newAgent = {
      id: (agents.length + 1).toString(),
      name,
      description,
      functionality,
      status: "draft" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
      deployments: [],
    };

    agents.push(newAgent);

    return reply.status(201).send({ agent: newAgent });
  });

  // Update agent
  fastify.put("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const validation = UpdateAgentSchema.safeParse(request.body);

    if (!validation.success) {
      return reply.status(400).send({
        error: "Validation failed",
        details: validation.error.errors,
      });
    }

    const agentIndex = agents.findIndex((a) => a.id === id);

    if (agentIndex === -1) {
      return reply.status(404).send({ error: "Agent not found" });
    }

    const updates = validation.data;
    const currentAgent = agents[agentIndex];
    agents[agentIndex] = {
      ...currentAgent,
      ...(updates.name && { name: updates.name }),
      ...(updates.description && { description: updates.description }),
      ...(updates.functionality && { functionality: updates.functionality }),
      ...(updates.status && { status: updates.status }),
      updatedAt: new Date(),
    };

    return { agent: agents[agentIndex] };
  });

  // Delete agent
  fastify.delete("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const agentIndex = agents.findIndex((a) => a.id === id);

    if (agentIndex === -1) {
      return reply.status(404).send({ error: "Agent not found" });
    }

    agents.splice(agentIndex, 1);

    return reply.status(204).send();
  });

  // Generate agent code
  fastify.post("/:id/generate", async (request, reply) => {
    const { id } = request.params as { id: string };
    const agent = agents.find((a) => a.id === id);

    if (!agent) {
      return reply.status(404).send({ error: "Agent not found" });
    }

    try {
      let generatedCode: string;

      // Use real AI if OpenAI API key is available
      if (process.env.OPENAI_API_KEY) {
        generatedCode = await generateAICode(agent);
      } else {
        // Fallback to template-based generation
        generatedCode = generateCloudflareAgentsSDKCode(agent);
      }

      // Update agent with generated code
      const agentIndex = agents.findIndex((a) => a.id === id);
      const updatedAgent = {
        ...agents[agentIndex],
        generatedCode,
        updatedAt: new Date(),
      };
      agents[agentIndex] = updatedAgent as any;

      return {
        agent: agents[agentIndex],
        generatedCode,
      };
    } catch (error) {
      console.error("Code generation error:", error);
      // Fallback to template-based generation
      const generatedCode = generateCloudflareAgentsSDKCode(agent);

      const agentIndex = agents.findIndex((a) => a.id === id);
      const updatedAgent = {
        ...agents[agentIndex],
        generatedCode,
        updatedAt: new Date(),
      };
      agents[agentIndex] = updatedAgent as any;

      return {
        agent: agents[agentIndex],
        generatedCode,
      };
    }
  });

  // Chat endpoint for natural language agent building
  fastify.post("/chat", async (request, reply) => {
    const { message } = request.body as { message: string };

    if (!message) {
      return reply.status(400).send({ error: "Message is required" });
    }

    try {
      // Use real AI if OpenAI API key is available
      if (process.env.OPENAI_API_KEY) {
        const response = await generateAIResponse(message);
        return { response };
      } else {
        // Fallback to simulated response
        const response = generateChatResponse(message);
        return { response };
      }
    } catch (error) {
      console.error("Chat error:", error);
      // Fallback to simulated response on error
      const response = generateChatResponse(message);
      return { response };
    }
  });

  // Deploy agent to Cloudflare
  fastify.post("/:id/deploy", async (request, reply) => {
    const { id } = request.params as { id: string };
    const validation = DeployAgentSchema.safeParse({
      ...(request.body as object),
      agentId: id,
    });

    if (!validation.success) {
      return reply.status(400).send({
        error: "Validation failed",
        details: validation.error.errors,
      });
    }

    const agent = agents.find((a) => a.id === id);

    if (!agent) {
      return reply.status(404).send({ error: "Agent not found" });
    }

    const { workerName, environment, cloudflareToken, accountId, zoneId } = validation.data;

    try {
      // Simulate Cloudflare deployment
      const deployment = await deployToCloudflare({
        agent,
        workerName,
        environment,
        cloudflareToken,
        accountId,
        zoneId,
      });

      deployments.push(deployment);

      // Update agent deployments
      const agentIndex = agents.findIndex((a) => a.id === id);
      agents[agentIndex].deployments.push(deployment);
      agents[agentIndex].status = "active";
      agents[agentIndex].updatedAt = new Date();

      return { deployment };
    } catch (error) {
      return reply.status(500).send({
        error: "Deployment failed",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  // Get all deployments
  fastify.get("/deployments", async (request, reply) => {
    return { deployments };
  });

  // Get deployment by ID
  fastify.get("/deployments/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const deployment = deployments.find((d) => d.id === id);

    if (!deployment) {
      return reply.status(404).send({ error: "Deployment not found" });
    }

    return { deployment };
  });

  // Update deployment status
  fastify.put("/deployments/:id/status", async (request, reply) => {
    const { id } = request.params as { id: string };
    const { status } = request.body as { status: string };

    if (!["deployed", "paused", "stopped"].includes(status)) {
      return reply.status(400).send({ error: "Invalid status" });
    }

    const deploymentIndex = deployments.findIndex((d) => d.id === id);

    if (deploymentIndex === -1) {
      return reply.status(404).send({ error: "Deployment not found" });
    }

    deployments[deploymentIndex].status = status;

    return { deployment: deployments[deploymentIndex] };
  });
};

// Helper function to generate Cloudflare agents SDK code
function generateCloudflareAgentsSDKCode(agent: any): string {
  return `import { Agent } from "agents";
import { OpenAI } from "openai";

export class ${agent.name.replace(/\s+/g, "")}Agent extends Agent {
  private openai: OpenAI;

  constructor(state: DurableObjectState, env: Env) {
    super(state, env);
    this.openai = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
    });
  }

  async onRequest(request: Request): Promise<Response> {
    const url = new URL(request.url);
    
    // Handle CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    try {
      if (url.pathname === '/api/chat' && request.method === 'POST') {
        const { message } = await request.json();
        const response = await this.processMessage(message);
        
        return new Response(JSON.stringify({ response }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      if (url.pathname === '/api/state' && request.method === 'GET') {
        return new Response(JSON.stringify(this.state), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
      
      return new Response(this.getHTMLInterface(), {
        headers: { 'Content-Type': 'text/html' },
      });
      
    } catch (error) {
      return new Response(JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  }

  async processMessage(message: string): Promise<string> {
    // Agent functionality: ${agent.functionality}
    
    const conversation = this.state.conversations || [];
    conversation.push({ role: 'user', content: message, timestamp: Date.now() });
    
    const completion = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: \`You are ${agent.name}. ${agent.description}. ${agent.functionality}\`
        },
        ...(conversation.slice(-10) as any[])
      ],
    });

    const response = completion.choices[0]?.message?.content || "I'm sorry, I couldn't process that request.";
    
    conversation.push({ role: 'assistant', content: response, timestamp: Date.now() });
    await this.setState({ conversations: conversation });

    return response;
  }

  async onConnect(connection: WebSocket): Promise<void> {
    await this.initiate(connection);
  }

  async onMessage(connection: WebSocket, message: string): Promise<void> {
    try {
      const data = JSON.parse(message);
      const response = await this.processMessage(data.content);
      
      connection.send(JSON.stringify({
        type: 'message',
        content: response,
        timestamp: Date.now()
      }));
    } catch (error) {
      connection.send(JSON.stringify({
        type: 'error',
        content: 'Failed to process message',
        timestamp: Date.now()
      }));
    }
  }

  private getHTMLInterface(): string {
    return \`<!DOCTYPE html>
<html>
<head>
  <title>${agent.name}</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      height: 100vh; display: flex; align-items: center; justify-content: center;
    }
    .container {
      background: white; border-radius: 12px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      width: 90%; max-width: 800px; height: 600px; display: flex; flex-direction: column;
    }
    .header { padding: 20px; border-bottom: 1px solid #eee; background: #f8f9fa; border-radius: 12px 12px 0 0; }
    .chat { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }
    .message { max-width: 70%; padding: 12px 16px; border-radius: 18px; word-wrap: break-word; }
    .user { align-self: flex-end; background: #007bff; color: white; }
    .assistant { align-self: flex-start; background: #f1f3f4; color: #333; }
    .input-area { padding: 20px; border-top: 1px solid #eee; display: flex; gap: 12px; }
    input { flex: 1; padding: 12px 16px; border: 1px solid #ddd; border-radius: 24px; outline: none; }
    button { padding: 12px 24px; background: #007bff; color: white; border: none; border-radius: 24px; cursor: pointer; }
    button:hover { background: #0056b3; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${agent.name}</h1>
      <p>${agent.description}</p>
    </div>
    <div class="chat" id="chat">
      <div class="message assistant">Hello! I'm ${agent.name}. How can I help you today?</div>
    </div>
    <div class="input-area">
      <input type="text" id="message" placeholder="Type your message..." />
      <button onclick="sendMessage()">Send</button>
    </div>
  </div>

  <script>
    let ws = null;
    
    function initWebSocket() {
      const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
      ws = new WebSocket(\`\${protocol}//\${location.host}/ws\`);
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        addMessage(data.content, 'assistant');
      };
    }
    
    async function sendMessage() {
      const input = document.getElementById('message');
      const message = input.value.trim();
      if (!message) return;
      
      addMessage(message, 'user');
      input.value = '';
      
      try {
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ content: message }));
        } else {
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
          });
          
          const data = await response.json();
          addMessage(data.response, 'assistant');
        }
      } catch (error) {
        addMessage('Sorry, I encountered an error. Please try again.', 'assistant');
      }
    }
    
    function addMessage(content, className) {
      const chat = document.getElementById('chat');
      const div = document.createElement('div');
      div.className = \`message \${className}\`;
      div.textContent = content;
      chat.appendChild(div);
      chat.scrollTop = chat.scrollHeight;
    }
    
    document.getElementById('message').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
    
    initWebSocket();
  </script>
</body>
</html>\`;
  }
}

// Durable Object configuration for wrangler.toml:
/*
[durable_objects]
bindings = [
  { name = "${agent.name.replace(/\s+/g, "")}Agent", class_name = "${agent.name.replace(/\s+/g, "")}Agent" }
]

[[migrations]]
tag = "v1"
new_classes = ["${agent.name.replace(/\s+/g, "")}Agent"]
*/`;
}

// Helper function to generate chat responses
function generateChatResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("customer support") || lowerMessage.includes("support bot")) {
    return `Great! I'll help you create a customer support agent using the Cloudflare agents SDK. This agent will have:

1. **Persistent Conversations**: Using Durable Objects to maintain chat history
2. **Real-time Chat**: WebSocket support for instant responses  
3. **AI Integration**: OpenAI integration for intelligent responses
4. **Scalable Deployment**: Runs on Cloudflare's global edge network

The agents SDK makes it easy to build stateful, intelligent agents that can handle customer inquiries, escalate issues, and maintain context across conversations.

Would you like me to generate the code for this agent?`;
  }

  if (lowerMessage.includes("content moderation") || lowerMessage.includes("moderate")) {
    return `Perfect! A content moderation agent using the Cloudflare agents SDK is a great choice. This agent will include:

1. **Real-time Analysis**: Process content as it's submitted
2. **Persistent Rules**: Store moderation rules in Durable Objects
3. **Learning Capability**: Improve over time with feedback
4. **Global Scale**: Deploy across Cloudflare's edge network

The agents SDK provides the perfect foundation for building intelligent, stateful moderation systems.

Ready to generate the code?`;
  }

  if (lowerMessage.includes("data processing") || lowerMessage.includes("data processor")) {
    return `Excellent choice! A data processing agent with the Cloudflare agents SDK will provide:

1. **Stream Processing**: Handle real-time data streams
2. **State Management**: Store processing rules and results
3. **Error Handling**: Robust error recovery and logging
4. **Edge Computing**: Process data close to users globally

The agents SDK's Durable Objects are perfect for maintaining processing state and ensuring data consistency.

Shall I generate the agent code for you?`;
  }

  return `I understand you want to create an agent for: "${message}"

Using the Cloudflare agents SDK, I can help you build an intelligent agent with:
- **Persistent State**: Durable Objects for data storage
- **Real-time Communication**: WebSocket and HTTP endpoints
- **AI Integration**: Connect with OpenAI or other AI services
- **Edge Deployment**: Global scale with Cloudflare Workers

Let me know if you'd like me to generate the code or if you need any specific features!`;
}

// Original helper function for backward compatibility
function generateWorkerCode(agent: any): string {
  return `// Generated Cloudflare Worker for: ${agent.name}
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Handle CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    try {
      if (url.pathname === '/api/chat' && request.method === 'POST') {
        const { message } = await request.json();
        
        // Agent functionality: ${agent.functionality}
        const response = await processMessage(message);
        
        return new Response(JSON.stringify({ response }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
      
      // Serve a simple HTML interface
      return new Response(getHTMLInterface(), {
        headers: { 'Content-Type': 'text/html' },
      });
      
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  },
};

async function processMessage(message) {
  // TODO: Implement your agent logic here
  // This is where the natural language description gets converted to actual functionality
  return "Hello! I'm ${agent.name}. " + message;
}

function getHTMLInterface() {
  return \`<!DOCTYPE html>
<html>
<head>
  <title>${agent.name}</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    .chat { border: 1px solid #ddd; height: 400px; overflow-y: auto; padding: 10px; margin: 10px 0; }
    input { width: 70%; padding: 10px; }
    button { padding: 10px 20px; }
  </style>
</head>
<body>
  <h1>${agent.name}</h1>
  <p>${agent.description}</p>
  <div class="chat" id="chat"></div>
  <input type="text" id="message" placeholder="Type your message...">
  <button onclick="sendMessage()">Send</button>
  
  <script>
    async function sendMessage() {
      const input = document.getElementById('message');
      const chat = document.getElementById('chat');
      const message = input.value;
      
      if (!message) return;
      
      chat.innerHTML += '<div><strong>You:</strong> ' + message + '</div>';
      input.value = '';
      
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message })
        });
        
        const data = await response.json();
        chat.innerHTML += '<div><strong>Agent:</strong> ' + data.response + '</div>';
        chat.scrollTop = chat.scrollHeight;
      } catch (error) {
        chat.innerHTML += '<div><strong>Error:</strong> ' + error.message + '</div>';
      }
    }
    
    document.getElementById('message').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') sendMessage();
    });
  </script>
</body>
</html>\`;
}`;
}

// Helper function to simulate Cloudflare deployment
async function deployToCloudflare(params: {
  agent: any;
  workerName: string;
  environment: string;
  cloudflareToken: string;
  accountId: string;
  zoneId?: string | undefined;
}) {
  const { agent, workerName, environment } = params;

  // Simulate deployment delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real implementation, this would:
  // 1. Use the Cloudflare API to create/update the worker
  // 2. Upload the generated code
  // 3. Configure routes and environment variables
  // 4. Return the deployment details

  const deployment = {
    id: `dep-${Date.now()}`,
    agentId: agent.id,
    workerName,
    url: `https://${workerName}.your-domain.workers.dev`,
    environment,
    status: "deployed",
    deployedAt: new Date(),
    version: `v1.0.${Date.now()}`,
    requests: 0,
    errors: 0,
    uptime: "100%",
  };

  return deployment;
}

// AI helper functions
async function generateAIResponse(message: string): Promise<string> {
  try {
    const { openai } = await import("@ai-sdk/openai");
    const { generateText } = await import("ai");

    const { text } = await generateText({
      model: openai("gpt-4o"),
      messages: [
        {
          role: "system",
          content: `You are an AI assistant helping users build Cloudflare Workers using the agents SDK. Be helpful and provide guidance on building intelligent agents.`,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.8,
      maxTokens: 500,
    });

    return text;
  } catch (error) {
    console.error("AI response generation failed:", error);
    return generateChatResponse(message);
  }
}

async function generateAICode(agent: any): Promise<string> {
  try {
    const { openai } = await import("@ai-sdk/openai");
    const { generateText } = await import("ai");

    const { text } = await generateText({
      model: openai("gpt-4o"),
      messages: [
        {
          role: "system",
          content: `You are an expert Cloudflare Workers developer specializing in the Cloudflare agents SDK. Generate production-ready TypeScript code using the agents SDK from https://www.npmjs.com/package/agents`,
        },
        {
          role: "user",
          content: `Generate a complete Cloudflare Worker using the agents SDK for: ${agent.name}
Description: ${agent.description}
Functionality: ${agent.functionality}

Requirements:
- Use the Agent class from the agents SDK
- Include Durable Objects for state persistence
- Add WebSocket support for real-time communication
- Include OpenAI integration for AI responses
- Create a modern HTML interface
- Add proper error handling and CORS`,
        },
      ],
      temperature: 0.7,
      maxTokens: 4000,
    });

    return text;
  } catch (error) {
    console.error("AI code generation failed:", error);
    return generateCloudflareAgentsSDKCode(agent);
  }
}

export default agentRoutes;
