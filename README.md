# BeeAI A2A Proxy

A proxy server for [BeeAI](https://docs.beeai.dev/introduction/welcome) A2A (Agent-to-Agent) communication that intercepts and modifies agent card endpoints to enable seamless integration with the BeeAI platform. You can literally take existing A2A agent and plug it into BeeAI without changing code of your A2A agent.

## Main Goal

The primary purpose of this proxy is to create a bridge between any A2A client and the BeeAI platform by:

- **Intercepting agent card requests**: The proxy captures `/.well-known/agent-card.json` requests from any A2A client
- **Adding AgentDetail extension**: It automatically injects the necessary [AgentDetail](https://docs.beeai.dev/build-agents/agent-details) extension data that enables the agent to be used within the BeeAI ecosystem. The extension is populated with sensible defaults, but can be customized by providing a custom JSON file
- **Auto-registration**: The proxy automatically registers the modified agent with the BeeAI platform, making it immediately available for use

This allows any A2A-compliant agent to seamlessly work with BeeAI without requiring modifications to the original agent implementation.

## Installation

```bash
npx tomkis/beeai-a2a-proxy
```

## Usage

### Step-by-step process

1. **Start your A2A agent** and note its URL (e.g., `http://localhost:8080`)
2. **Start the proxy** pointing to your agent:
   ```bash
   npx tomkis/beeai-a2a-proxy start http://localhost:8080
   ```

### Examples

**Basic usage:**
```bash
npx tomkis/beeai-a2a-proxy start http://localhost:8080
```

**With custom proxy port:**
```bash
npx tomkis/beeai-a2a-proxy start http://localhost:8080 --port 4000
```

**Disable auto-registration:**
```bash
npx tomkis/beeai-a2a-proxy start http://localhost:8080 --auto-register false
```

**With custom platform URL:**
```bash
npx tomkis/beeai-a2a-proxy start http://localhost:8080 --platform-url http://localhost:9000
```

**With custom agent detail data:**
```bash
npx tomkis/beeai-a2a-proxy start http://localhost:8080 --custom-data ./my-agent-details.json
```

### Available options
- `--port, -p`: Port to run the proxy server on (default: 8000)
- `--auto-register, -a`: Enable/disable auto-registration with the BeeAI platform (default: true)
- `--platform-url, -P`: Platform URL to register with (default: http://127.0.0.1:8333)
- `--custom-data, -c`: Path to custom agent detail JSON file
