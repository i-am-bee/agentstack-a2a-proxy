# Agent Stack A2A Proxy

A zero-configuration bridge that connects any A2A agent to the Agent Stack, no code changes required.

## What It Does

This proxy lets you plug an existing A2A agent into the Agent Stack instantly by:

1. **Intercepting agent card requests** – Captures calls to `/.well-known/agent-card.json`
2. **Injecting Agent Stack metadata** – Adds the [Agent Details extension](http://agentstack.beeai.dev/build-agents/agent-details) required by the Agent Stack
3. **Auto-registering your agent** – Makes it immediately available in the Agent Stack interface

**Result**: Your A2A agent works in Agent Stack without touching your agent's code.

## Quickstart

### Prerequisites

- A running A2A agent (e.g., at `http://localhost:8080`)
- Node.js installed
- Agent Stack running (default: `http://127.0.0.1:8333`)

### Connect Your Agent

1. Start your A2A agent and note its URL (e.g., `http://localhost:8080`)
2. Run the proxy pointing to your agent:
```bash
npx i-am-bee/agentstack-a2a-proxy start http://localhost:8080
```

Your agent is now live in Agent Stack at `http://127.0.0.1:8333` 🎉

## Optional Configuration

**Use a different proxy port:**
```bash
npx i-am-bee/agentstack-a2a-proxy start http://localhost:8080 --port 4000
```

**Point to a custom Agent Stack URL:**
```bash
npx i-am-bee/agentstack-a2a-proxy start http://localhost:8080 --platform-url http://localhost:9000
```

**Skip auto-registration (manual registration only):**
```bash
npx i-am-bee/agentstack-a2a-proxy start http://localhost:8080 --auto-register false
```

**Provide custom agent metadata:**
```bash
npx i-am-bee/agentstack-a2a-proxyy start http://localhost:8080 --custom-data ./my-agent-details.json
```

### All Options

| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| `--port` | `-p` | Proxy server port | `8000` |
| `--auto-register` | `-a` | Auto-register with Agent Stack | `true` |
| `--platform-url` | `-P` | Agent Stack URL | `http://127.0.0.1:8333` |
| `--custom-data` | `-c` | Custom AgentDetail JSON file | (uses defaults) |

## Limitations

- **Development only** – The proxy is for local testing. For production, add the AgentDetail extension directly to your agent's code.
- **Supported protocols** – Works with `jsonrpc` and `http_json` transport protocols.
