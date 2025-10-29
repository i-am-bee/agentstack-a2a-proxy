# BeeAI A2A Proxy

A zero-configuration bridge that connects any A2A agent to the BeeAI platform—no code changes required.

## What It Does

This proxy lets you plug an existing A2A agent into the BeeAI Platform instantly by:

1. **Intercepting agent card requests** – Captures calls to `/.well-known/agent-card.json`
2. **Injecting BeeAI metadata** – Adds the [Agent Details extension](https://docs.beeai.dev/build-agents/agent-details) required by the BeeAI Platform
3. **Auto-registering your agent** – Makes it immediately available in the BeeAI Platform interface

**Result**: Your A2A agent works in BeeAI Platform without touching your agent's code.

## Quickstart

### Prerequisites

- A running A2A agent (e.g., at `http://localhost:8080`)
- Node.js installed
- BeeAI Platform running (default: `http://127.0.0.1:8333`)

### Connect Your Agent

1. Start your A2A agent and note its URL (e.g., `http://localhost:8080`)
2. Run the proxy pointing to your agent:
```bash
npx tomkis/beeai-a2a-proxy start http://localhost:8080
```

Your agent is now live in BeeAI Platform at `http://127.0.0.1:8333` 🎉

## Optional Configuration

**Use a different proxy port:**
```bash
npx tomkis/beeai-a2a-proxy start http://localhost:8080 --port 4000
```

**Point to a custom BeeAI platform URL:**
```bash
npx tomkis/beeai-a2a-proxy start http://localhost:8080 --platform-url http://localhost:9000
```

**Skip auto-registration (manual registration only):**
```bash
npx tomkis/beeai-a2a-proxy start http://localhost:8080 --auto-register false
```

**Provide custom agent metadata:**
```bash
npx tomkis/beeai-a2a-proxy start http://localhost:8080 --custom-data ./my-agent-details.json
```

### All Options

| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| `--port` | `-p` | Proxy server port | `8000` |
| `--auto-register` | `-a` | Auto-register with BeeAI | `true` |
| `--platform-url` | `-P` | BeeAI platform URL | `http://127.0.0.1:8333` |
| `--custom-data` | `-c` | Custom AgentDetail JSON file | (uses defaults) |

## Limitations

- **Development only** – The proxy is for local testing. For production, add the AgentDetail extension directly to your agent's code.
- **Supported protocols** – Works with `jsonrpc` and `http_json` transport protocols.
