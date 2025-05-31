import { createFileRoute } from "@tanstack/react-router";
import { apiClient } from "@/lib/api";
import { useState, useRef, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  IconBot,
  IconRocket,
  IconCode,
  IconZap,
  IconCloud,
  IconCog,
  IconPlay,
  IconPlus,
} from "@/components/icons";

export const Route = createFileRoute("/dashboard/agents/builder")({
  component: AgentBuilderPage,
});

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

function AgentBuilderPage() {
  const [agentName, setAgentName] = useState("");
  const [agentDescription, setAgentDescription] = useState("");
  const [functionality, setFunctionality] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  // Chat interface state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi! I'm here to help you build your Cloudflare Worker agent. Tell me what you'd like your agent to do, and I'll generate the code using the Cloudflare agents SDK. For example, you could say: 'Create a customer support bot that can answer questions about products and handle refunds.'",
      timestamp: new Date(),
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: chatInput,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    const currentInput = chatInput;
    setChatInput("");
    setIsChatLoading(true);

    try {
      // Call the real API endpoint using the API utility
      const response = await apiClient.post("/agent/chat", { message: currentInput });
      const data = response.data;

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, assistantMessage]);

      // Auto-populate form if agent details are detected
      if (
        currentInput.toLowerCase().includes("customer support") ||
        currentInput.toLowerCase().includes("support bot")
      ) {
        setAgentName("Customer Support Agent");
        setAgentDescription("AI-powered customer support agent");
        setFunctionality(currentInput);
      } else if (
        currentInput.toLowerCase().includes("content moderation") ||
        currentInput.toLowerCase().includes("moderate")
      ) {
        setAgentName("Content Moderator");
        setAgentDescription("Automated content moderation agent");
        setFunctionality(currentInput);
      } else if (
        currentInput.toLowerCase().includes("data processing") ||
        currentInput.toLowerCase().includes("data processor")
      ) {
        setAgentName("Data Processor");
        setAgentDescription("Real-time data processing agent");
        setFunctionality(currentInput);
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const generateAgentResponse = (userInput: string): string => {
    // This would be replaced with actual AI integration
    if (
      userInput.toLowerCase().includes("customer support") ||
      userInput.toLowerCase().includes("support")
    ) {
      return `Great! I'll help you create a customer support agent. Based on your description, I'll generate a Cloudflare Worker using the agents SDK that can:

1. Handle customer inquiries
2. Provide instant responses
3. Escalate complex issues
4. Maintain conversation context

Here's what I'll include in the agent:
- Persistent state using Durable Objects
- Natural conversation flow
- Integration with AI models
- WebSocket support for real-time chat

Would you like me to generate the code now? I can also add specific features like:
- Product knowledge base integration
- Ticket creation system
- Multi-language support
- Analytics tracking`;
    }

    if (
      userInput.toLowerCase().includes("content moderation") ||
      userInput.toLowerCase().includes("moderate")
    ) {
      return `Perfect! I'll create a content moderation agent that can automatically review and filter content. This agent will use the Cloudflare agents SDK to:

1. Analyze text for inappropriate content
2. Flag suspicious material
3. Auto-approve safe content
4. Learn from moderation decisions

The agent will include:
- Real-time content analysis
- Configurable moderation rules
- Appeal handling system
- Detailed logging and reporting

Ready to generate the code?`;
    }

    return `I understand you want to create an agent for: "${userInput}"

I'll help you build this using the Cloudflare agents SDK. The agent will include:
- Persistent state management
- Real-time communication capabilities
- AI-powered responses
- Scalable deployment on Cloudflare's edge network

Let me know if you'd like me to generate the code or if you need any specific features added!`;
  };

  const handleGenerateFromChat = async () => {
    setIsGenerating(true);

    try {
      // Extract the latest functionality from chat
      const lastUserMessage = chatMessages.filter((m) => m.role === "user").pop();
      if (lastUserMessage) {
        setFunctionality(lastUserMessage.content);
      }

      const code = generateCloudflareAgentCode(
        agentName || "AI Agent",
        functionality || lastUserMessage?.content || ""
      );
      setGeneratedCode(code);
    } catch (error) {
      console.error("Code generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateCloudflareAgentCode = (name: string, description: string): string => {
    const className = name.replace(/\s+/g, "") + "Agent";

    return `import { Agent } from "agents";
import { OpenAI } from "openai";

/**
 * ${name} - Built with Cloudflare agents SDK
 * 
 * This agent uses:
 * - Durable Objects for persistent state
 * - WebSocket for real-time communication  
 * - OpenAI for intelligent responses
 * - Modern HTML interface
 * 
 * Functionality: ${description}
 */
export class ${className} extends Agent {
  private openai: OpenAI;

  constructor(state: DurableObjectState, env: Env) {
    super(state, env);
    this.openai = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
    });
  }

  async onRequest(request: Request): Promise<Response> {
    const url = new URL(request.url);
    
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    try {
      // Chat API endpoint
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

      // State inspection endpoint
      if (url.pathname === '/api/state' && request.method === 'GET') {
        const conversations = await this.state.storage.get('conversations') || [];
        return new Response(JSON.stringify({ 
          conversations: conversations.slice(-5), // Last 5 conversations
          totalMessages: conversations.length 
        }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      // Health check endpoint
      if (url.pathname === '/api/health' && request.method === 'GET') {
        return new Response(JSON.stringify({ 
          status: 'healthy',
          agent: '${name}',
          timestamp: new Date().toISOString()
        }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
      
      // Serve the main interface
      return new Response(this.getHTMLInterface(), {
        headers: { 
          'Content-Type': 'text/html',
          'Cache-Control': 'public, max-age=3600'
        },
      });
      
    } catch (error) {
      console.error('Request error:', error);
      return new Response(JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
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
    try {
      // Get conversation history
      const conversations = await this.state.storage.get('conversations') || [];
      
      // Add user message
      const userMessage = { 
        role: 'user', 
        content: message, 
        timestamp: Date.now() 
      };
      conversations.push(userMessage);
      
      // Generate AI response based on agent functionality
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: \`You are ${name}. ${description}

Your capabilities include:
- Maintaining conversation context
- Providing helpful and accurate responses
- Learning from user interactions
- Escalating complex issues when needed

Always be professional, helpful, and stay in character.\`
          },
          ...conversations.slice(-10).map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      const response = completion.choices[0]?.message?.content || 
        "I apologize, but I'm having trouble processing your request right now.";
      
      // Save assistant response
      const assistantMessage = { 
        role: 'assistant', 
        content: response, 
        timestamp: Date.now() 
      };
      conversations.push(assistantMessage);
      
      // Store updated conversation (keep last 50 messages)
      await this.state.storage.put('conversations', conversations.slice(-50));
      
      return response;
    } catch (error) {
      console.error('Message processing error:', error);
      return "I'm sorry, I encountered an error processing your message. Please try again.";
    }
  }

  async onConnect(connection: WebSocket): Promise<void> {
    // Initialize WebSocket connection
    await this.initiate(connection);
    
    // Send welcome message
    connection.send(JSON.stringify({
      type: 'welcome',
      content: \`Connected to ${name}! How can I help you today?\`,
      timestamp: Date.now()
    }));
  }

  async onMessage(connection: WebSocket, message: string): Promise<void> {
    try {
      const data = JSON.parse(message);
      
      if (data.type === 'chat' && data.content) {
        const response = await this.processMessage(data.content);
        
        connection.send(JSON.stringify({
          type: 'message',
          content: response,
          timestamp: Date.now()
        }));
      }
    } catch (error) {
      console.error('WebSocket message error:', error);
      connection.send(JSON.stringify({
        type: 'error',
        content: 'Failed to process message',
        timestamp: Date.now()
      }));
    }
  }

  private getHTMLInterface(): string {
    return \`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} - AI Agent</title>
  <style>
    * { 
      margin: 0; 
      padding: 0; 
      box-sizing: border-box; 
    }
    
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    
    .container {
      background: white;
      border-radius: 16px;
      box-shadow: 0 25px 50px rgba(0,0,0,0.15);
      width: 100%;
      max-width: 900px;
      height: 700px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    
    .header {
      padding: 24px;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-bottom: 1px solid #dee2e6;
    }
    
    .header h1 {
      font-size: 24px;
      font-weight: 600;
      color: #212529;
      margin-bottom: 4px;
    }
    
    .header p {
      color: #6c757d;
      font-size: 14px;
    }
    
    .chat {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
      background: #fafafa;
    }
    
    .message {
      max-width: 75%;
      padding: 12px 16px;
      border-radius: 18px;
      word-wrap: break-word;
      line-height: 1.4;
      animation: fadeIn 0.3s ease-in;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .user { 
      align-self: flex-end;
      background: #007bff;
      color: white;
      border-bottom-right-radius: 4px;
    }
    
    .assistant { 
      align-self: flex-start;
      background: white;
      color: #333;
      border: 1px solid #e9ecef;
      border-bottom-left-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    
    .typing {
      opacity: 0.7;
      font-style: italic;
      animation: pulse 1.5s infinite;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 0.7; }
      50% { opacity: 1; }
    }
    
    .input-area {
      padding: 20px;
      background: white;
      border-top: 1px solid #dee2e6;
      display: flex;
      gap: 12px;
      align-items: center;
    }
    
    .input-container {
      flex: 1;
      position: relative;
    }
    
    input {
      width: 100%;
      padding: 14px 20px;
      border: 2px solid #e9ecef;
      border-radius: 25px;
      outline: none;
      font-size: 14px;
      transition: border-color 0.2s ease;
    }
    
    input:focus {
      border-color: #007bff;
    }
    
    button {
      padding: 14px 24px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 25px;
      cursor: pointer;
      font-weight: 500;
      font-size: 14px;
      transition: background-color 0.2s ease;
      min-width: 80px;
    }
    
    button:hover:not(:disabled) { 
      background: #0056b3; 
    }
    
    button:disabled {
      background: #6c757d;
      cursor: not-allowed;
    }
    
    .status {
      position: absolute;
      top: -20px;
      right: 0;
      font-size: 12px;
      color: #6c757d;
    }
    
    .connected { color: #28a745; }
    .disconnected { color: #dc3545; }
    
    @media (max-width: 768px) {
      .container {
        height: 100vh;
        border-radius: 0;
        max-width: none;
      }
      
      body {
        padding: 0;
      }
      
      .message {
        max-width: 85%;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${name}</h1>
      <p>${agentDescription || "AI-powered agent ready to assist you"}</p>
      <div class="status" id="status">Connecting...</div>
    </div>
    
    <div class="chat" id="chat">
      <div class="message assistant">
        👋 Hello! I'm ${name}. How can I help you today?
      </div>
    </div>
    
    <div class="input-area">
      <div class="input-container">
        <input 
          type="text" 
          id="message" 
          placeholder="Type your message..." 
          autocomplete="off"
        />
      </div>
      <button id="sendBtn" onclick="sendMessage()">Send</button>
    </div>
  </div>

  <script>
    let ws = null;
    let isConnected = false;
    
    function updateStatus(status, isConnected = false) {
      const statusEl = document.getElementById('status');
      statusEl.textContent = status;
      statusEl.className = isConnected ? 'status connected' : 'status disconnected';
    }
    
    function initWebSocket() {
      try {
        const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
        ws = new WebSocket(\`\${protocol}//\${location.host}/ws\`);
        
        ws.onopen = () => {
          isConnected = true;
          updateStatus('Connected', true);
        };
        
        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.type === 'message' || data.type === 'welcome') {
            addMessage(data.content, 'assistant');
          }
        };
        
        ws.onclose = () => {
          isConnected = false;
          updateStatus('Disconnected', false);
          // Attempt to reconnect after 3 seconds
          setTimeout(initWebSocket, 3000);
        };
        
        ws.onerror = () => {
          updateStatus('Connection Error', false);
        };
      } catch (error) {
        updateStatus('WebSocket Not Available', false);
      }
    }
    
    async function sendMessage() {
      const input = document.getElementById('message');
      const sendBtn = document.getElementById('sendBtn');
      const message = input.value.trim();
      
      if (!message) return;
      
      addMessage(message, 'user');
      input.value = '';
      sendBtn.disabled = true;
      sendBtn.textContent = 'Sending...';
      
      // Show typing indicator
      const typingDiv = addMessage('Thinking...', 'assistant typing');
      
      try {
        if (ws && ws.readyState === WebSocket.OPEN) {
          // Use WebSocket
          ws.send(JSON.stringify({ 
            type: 'chat', 
            content: message 
          }));
          typingDiv.remove();
        } else {
          // Fallback to HTTP
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
          });
          
          if (!response.ok) throw new Error('Network response was not ok');
          
          const data = await response.json();
          typingDiv.remove();
          addMessage(data.response, 'assistant');
        }
      } catch (error) {
        typingDiv.remove();
        addMessage('Sorry, I encountered an error. Please try again.', 'assistant');
        console.error('Send message error:', error);
      } finally {
        sendBtn.disabled = false;
        sendBtn.textContent = 'Send';
        input.focus();
      }
    }
    
    function addMessage(content, className) {
      const chat = document.getElementById('chat');
      const div = document.createElement('div');
      div.className = \`message \${className}\`;
      div.textContent = content;
      chat.appendChild(div);
      chat.scrollTop = chat.scrollHeight;
      return div;
    }
    
    // Event listeners
    document.getElementById('message').addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
    
    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
      initWebSocket();
      document.getElementById('message').focus();
    });
  </script>
</body>
</html>\`;
  }
}

// Deployment Configuration for wrangler.toml:
/*
name = "${name.toLowerCase().replace(/\s+/g, "-")}-agent"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[durable_objects]
bindings = [
  { name = "${className.toUpperCase()}", class_name = "${className}" }
]

[[migrations]]
tag = "v1"
new_classes = ["${className}"]

[vars]
ENVIRONMENT = "production"

# Add your OpenAI API key as a secret:
# wrangler secret put OPENAI_API_KEY
*/`;
  };

  const handleGenerateAgent = async () => {
    if (!agentName || !functionality) return;

    setIsGenerating(true);

    try {
      // Create a temporary agent to generate code
      const agentSpec = {
        name: agentName,
        description: agentDescription,
        functionality: functionality,
      };

      // For now, use the local generation function
      // In a real implementation, you'd call an API endpoint
      const code = generateCloudflareAgentCode(agentName, functionality);
      setGeneratedCode(code);
    } catch (error) {
      console.error("Code generation error:", error);
      // Fallback to local generation
      const code = generateCloudflareAgentCode(agentName, functionality);
      setGeneratedCode(code);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Agent Platform</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard/agents">Agents</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Builder</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex-1 space-y-6 p-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Agent Builder</h1>
              <p className="text-muted-foreground">
                Describe your agent in natural language and we'll generate the code using
                Cloudflare's agents SDK
              </p>
            </div>
            <Badge variant="outline" className="gap-2">
              <IconZap className="h-3 w-3" />
              AI-Powered
            </Badge>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Chat Interface */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconBot className="h-5 w-5" />
                  AI Assistant
                </CardTitle>
                <CardDescription>Describe your agent and I'll help you build it</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px] p-4">
                  <div className="space-y-4">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}
                    {isChatLoading && (
                      <div className="flex justify-start">
                        <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>
                </ScrollArea>
                <div className="p-4 border-t">
                  <form onSubmit={handleChatSubmit} className="flex gap-2">
                    <Input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Describe your agent..."
                      disabled={isChatLoading}
                    />
                    <Button type="submit" size="sm" disabled={isChatLoading}>
                      Send
                    </Button>
                  </form>
                  <Button
                    onClick={handleGenerateFromChat}
                    className="w-full mt-2 gap-2"
                    variant="outline"
                    disabled={isGenerating}
                  >
                    <IconCode className="h-4 w-4" />
                    Generate Code from Chat
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Configuration Panel */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconCog className="h-5 w-5" />
                  Agent Configuration
                </CardTitle>
                <CardDescription>Fine-tune your agent's details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="agent-name">Agent Name</Label>
                  <Input
                    id="agent-name"
                    placeholder="e.g., Customer Support Bot"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="agent-description">Description</Label>
                  <Input
                    id="agent-description"
                    placeholder="Brief description of what your agent does"
                    value={agentDescription}
                    onChange={(e) => setAgentDescription(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="functionality">Functionality</Label>
                  <Textarea
                    id="functionality"
                    placeholder="Detailed description of your agent's capabilities..."
                    className="min-h-[120px]"
                    value={functionality}
                    onChange={(e) => setFunctionality(e.target.value)}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Quick Templates</h3>
                  <div className="grid gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setAgentName("Customer Support Agent");
                        setAgentDescription("AI-powered customer support agent");
                        setFunctionality(
                          "Handle customer inquiries, provide product information, process refunds, and escalate complex issues to human agents. Maintain conversation context and provide personalized responses."
                        );
                      }}
                    >
                      Customer Support
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setAgentName("Content Moderator");
                        setAgentDescription("Automated content moderation agent");
                        setFunctionality(
                          "Review and moderate user-generated content for inappropriate language, spam, and harmful material. Flag suspicious content for human review while auto-approving safe content."
                        );
                      }}
                    >
                      Content Moderation
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={handleGenerateAgent}
                  disabled={!agentName || !functionality || isGenerating}
                  className="w-full gap-2"
                >
                  {isGenerating ? (
                    <>
                      <IconCog className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <IconCode className="h-4 w-4" />
                      Generate Agent
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Code Preview Panel */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconCode className="h-5 w-5" />
                  Generated Code
                </CardTitle>
                <CardDescription>Cloudflare Worker with agents SDK</CardDescription>
              </CardHeader>
              <CardContent>
                {generatedCode ? (
                  <div className="space-y-4">
                    <ScrollArea className="h-[400px]">
                      <div className="bg-muted rounded-lg p-4">
                        <pre className="text-xs overflow-auto">
                          <code>{generatedCode}</code>
                        </pre>
                      </div>
                    </ScrollArea>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Copy Code
                      </Button>
                      <Button size="sm" variant="outline">
                        Download
                      </Button>
                      <Button size="sm" className="gap-2 ml-auto">
                        <IconRocket className="h-3 w-3" />
                        Deploy
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[400px] text-center text-muted-foreground">
                    <IconCode className="h-12 w-12 mb-4 opacity-50" />
                    <p>Use the chat or configuration panel to generate your agent code</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Deployment Preview */}
          {generatedCode && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconCloud className="h-5 w-5" />
                  Deployment Preview
                </CardTitle>
                <CardDescription>
                  Your agent will be deployed as a Cloudflare Worker with Durable Objects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Worker Name</Label>
                    <Input value={agentName.toLowerCase().replace(/\s+/g, "-")} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Deployment URL</Label>
                    <Input
                      value={`https://${agentName
                        .toLowerCase()
                        .replace(/\s+/g, "-")}.your-domain.workers.dev`}
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Agent Type</Label>
                    <Input value="Durable Object Agent" readOnly />
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button className="gap-2">
                    <IconPlay className="h-4 w-4" />
                    Test Agent
                  </Button>
                  <Button variant="outline">Configure Environment</Button>
                  <Button variant="outline">View Documentation</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
