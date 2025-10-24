# BeeAI A2A Proxy

A proxy server for BeeAI A2A (Agent-to-Agent) communication that intercepts and modifies agent card endpoints.

## Installation

```bash
npx tomkis/beeai-a2a-proxy
```

## Usage

### Default usage (starts on port 3000)
```bash
npx tomkis/beeai-a2a-proxy
```

### With custom options
```bash
npx tomkis/beeai-a2a-proxy start --port 4000 --target http://localhost:8080
```

### Available options
- `--port, -p`: Port to run the proxy server on (default: 3000)
- `--target, -t`: Target URL to proxy to (default: http://localhost:10001)
- `--no-register`: Skip auto-registration with the provider API

## What it does

This proxy server:
- Runs on the specified port (default: 3000)
- Proxies all requests to the target backend
- Intercepts `/.well-known/agent-card.json` requests
- Modifies the agent card JSON to add A2A extensions
- Auto-registers with the provider API (unless disabled)

## Development

```bash
# Install dependencies
pnpm install

# Run locally
pnpm run cli

# Build
pnpm run build
```
