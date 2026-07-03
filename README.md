# Mock SDK

Mock API client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

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

## Quickstart

### TypeScript

```ts
import { MockSDK } from 'mock'

const client = new MockSDK({
  apikey: process.env.MOCK_APIKEY,
})

// List all carts
const carts = await client.Cart().list()
console.log(carts.data)
```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

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
| **Cart** |  | `/public/carts` |
| **Coupon** |  | `/public/coupons` |
| **CreateCustomResourceItem** |  | `/{resource}` |
| **DeleteCustomResourceItem** |  | `/{resource}/{id}` |
| **GetCustomResource** |  | `/{resource}` |
| **GetCustomResourceItemById** |  | `/{resource}/{id}` |
| **PatchCustomResourceItem** |  | `/{resource}/{id}` |
| **Product** |  | `/public/products` |
| **Status** |  | `/public/status/{code}` |
| **UpdateCustomResourceItem** |  | `/{resource}/{id}` |
| **User** |  | `/public/users` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from mock_sdk import MockSDK

client = MockSDK({
    "apikey": os.environ.get("MOCK_APIKEY"),
})

# List all carts
carts, err = client.Cart().list()
print(carts)
```

### PHP

```php
<?php
require_once 'mock_sdk.php';

$client = new MockSDK([
    "apikey" => getenv("MOCK_APIKEY"),
]);

// List all carts
[$carts, $err] = $client->Cart()->list();
print_r($carts);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/mock-sdk/go"

client := sdk.NewMockSDK(map[string]any{
    "apikey": os.Getenv("MOCK_APIKEY"),
})

// List all carts
carts, err := client.Cart(nil).List(nil, nil)
fmt.Println(carts)
```

### Ruby

```ruby
require_relative "Mock_sdk"

client = MockSDK.new({
  "apikey" => ENV["MOCK_APIKEY"],
})

# List all carts
carts, err = client.Cart().list
puts carts
```

### Lua

```lua
local sdk = require("mock_sdk")

local client = sdk.new({
  apikey = os.getenv("MOCK_APIKEY"),
})

-- List all carts
local carts, err = client:Cart():list()
print(carts)
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
client = MockSDK.test()
result, err = client.Cart().load({"id": "test01"})
```

### PHP

```php
$client = MockSDK::test();
[$result, $err] = $client->Cart()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.Cart(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = MockSDK.test
result, err = client.Cart().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:Cart():load({ id = "test01" })
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

---

Generated from the Mock API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
