# Mock SDK

Spin up a customizable mock REST API for testing and prototyping, with public sample resources or your own JSON

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Mock API

[Mock API](https://jsoning.com/api/) is a free mock-server hosted at `api.jsoning.com/mock` and maintained as part of [jsoning.com](https://jsoning.com), a collection of JSON-focused developer tools by Cyril Bois. It lets you instantly generate a REST API from a JSON object and define rules that customise how requests are matched and responded to.

What you get from the API:

- A small set of read-only **public sample resources** under `https://api.jsoning.com/mock/public/{resource}` — `products` (10), `users` (5), `carts` (5), `coupons` (5), and `status` (for exercising HTTP status codes).
- Standard REST verbs (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) against your own custom resources.
- A rule engine that can match on method, path, headers, and payload and short-circuit the default response.

No authentication is required for the public endpoints, and CORS is enabled so the API can be called directly from browser code. Custom resources you create are wiped daily, so this service is best suited to testing, prototyping, and demos rather than persistent storage. The project is open source and can also be run locally.

## Try it

**TypeScript**
```bash
npm install mock
```

**Python**
```bash
pip install mock-sdk
```

**PHP**
```bash
composer require voxgig/mock-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/mock-sdk/go
```

**Ruby**
```bash
gem install mock-sdk
```

**Lua**
```bash
luarocks install mock-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { MockSDK } from 'mock'

const client = new MockSDK({})

// List all carts
const carts = await client.Cart().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o mock-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "mock": {
      "command": "/abs/path/to/mock-mcp"
    }
  }
}
```

## Entities

The API exposes 11 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Cart** | Public sample shopping-cart resource at `GET /mock/public/carts` (5 items) for prototyping cart-related UIs. | `/public/carts` |
| **Coupon** | Public sample discount-coupon resource at `GET /mock/public/coupons` (5 items). | `/public/coupons` |
| **CreateCustomResourceItem** | Create an item in a user-defined custom resource using a `POST` against that resource's path. | `/{resource}` |
| **DeleteCustomResourceItem** | Remove an item from a custom resource via `DELETE`. | `/{resource}/{id}` |
| **GetCustomResource** | List all items in a user-defined custom resource via `GET` on the resource path. | `/{resource}` |
| **GetCustomResourceItemById** | Fetch a single item from a user-defined custom resource by its id via `GET`. | `/{resource}/{id}` |
| **PatchCustomResourceItem** | Partially update an existing item in a custom resource via `PATCH`. | `/{resource}/{id}` |
| **Product** | Public sample product catalogue at `GET /mock/public/products` (10 items). | `/public/products` |
| **Status** | Helper resource under `/mock/public/status` for exercising specific HTTP status codes in tests. | `/public/status/{code}` |
| **UpdateCustomResourceItem** | Replace an existing item in a custom resource via `PUT`. | `/{resource}/{id}` |
| **User** | Public sample user resource at `GET /mock/public/users` (5 items). | `/public/users` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from mock_sdk import MockSDK

client = MockSDK({})

# List all carts
carts, err = client.Cart(None).list(None, None)
```

### PHP

```php
<?php
require_once 'mock_sdk.php';

$client = new MockSDK([]);

// List all carts
[$carts, $err] = $client->Cart(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/mock-sdk/go"

client := sdk.NewMockSDK(map[string]any{})

// List all carts
carts, err := client.Cart(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Mock_sdk"

client = MockSDK.new({})

# List all carts
carts, err = client.Cart(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("mock_sdk")

local client = sdk.new({})

-- List all carts
local carts, err = client:Cart(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = MockSDK.test()
const result = await client.Cart().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = MockSDK.test(None, None)
result, err = client.Cart(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = MockSDK::test(null, null);
[$result, $err] = $client->Cart(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Cart(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = MockSDK.test(nil, nil)
result, err = client.Cart(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Cart(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Mock API

- Upstream: [https://jsoning.com/api/](https://jsoning.com/api/)

- Open-source service maintained by Cyril Bois at [jsoning.com](https://jsoning.com).
- Public mock endpoints under `https://api.jsoning.com/mock/public/` require no authentication.
- Custom resources are ephemeral and are deleted daily — recreate them as needed.
- The project is available on GitHub for self-hosting; check the upstream repository for the exact licence terms.

---

Generated from the Mock API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
