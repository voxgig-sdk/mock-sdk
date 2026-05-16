# Mock SDK



Available for [Golang](go/) and [Lua](lua/) and [PHP](php/) and [Python](py/) and [Ruby](rb/) and [TypeScript](ts/).


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

Each entity supports the following operations where available: **load**, **list**, **create**,
**update**, and **remove**.


## Architecture

### Entity-operation model

Every SDK call follows the same pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

At each stage a feature hook fires (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), allowing features to inspect or modify the pipeline.

### Features

Features are hook-based middleware that extend SDK behaviour.

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

You can add custom features by passing them in the `extend` option at
construction time.

### Direct and Prepare

For endpoints not covered by the entity model, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`, `headers`,
and `body`.


## Quick start

### Golang

```go
import sdk "github.com/voxgig-sdk/mock-sdk"

client := sdk.NewMockSDK(map[string]any{
    "apikey": os.Getenv("MOCK_APIKEY"),
})

// List all carts
carts, err := client.Cart(nil).List(nil, nil)
```

### Lua

```lua
local sdk = require("mock_sdk")

local client = sdk.new({
  apikey = os.getenv("MOCK_APIKEY"),
})

-- List all carts
local carts, err = client:Cart(nil):list(nil, nil)
```

### PHP

```php
<?php
require_once 'mock_sdk.php';

$client = new MockSDK([
    "apikey" => getenv("MOCK_APIKEY"),
]);

// List all carts
[$carts, $err] = $client->Cart(null)->list(null, null);
```

### Python

```python
import os
from mock_sdk import MockSDK

client = MockSDK({
    "apikey": os.environ.get("MOCK_APIKEY"),
})

# List all carts
carts, err = client.Cart(None).list(None, None)
```

### Ruby

```ruby
require_relative "Mock_sdk"

client = MockSDK.new({
  "apikey" => ENV["MOCK_APIKEY"],
})

# List all carts
carts, err = client.Cart(nil).list(nil, nil)
```

### TypeScript

```ts
import { MockSDK } from 'mock'

const client = new MockSDK({
  apikey: process.env.MOCK_APIKEY,
})

// List all carts
const carts = await client.Cart().list()
```


## Testing

Both SDKs provide a test mode that replaces the HTTP transport with an
in-memory mock, so tests run without a network connection.

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Cart(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Cart(nil):load(
  { id = "test01" }, nil
)
```

### PHP

```php
$client = MockSDK::test(null, null);
[$result, $err] = $client->Cart(null)->load(
    ["id" => "test01"], null
);
```

### Python

```python
client = MockSDK.test(None, None)
result, err = client.Cart(None).load(
    {"id": "test01"}, None
)
```

### Ruby

```ruby
client = MockSDK.test(nil, nil)
result, err = client.Cart(nil).load(
  { "id" => "test01" }, nil
)
```

### TypeScript

```ts
const client = MockSDK.test()
const result = await client.Cart().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```


## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
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

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
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

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```


## Language-specific documentation

- [Golang SDK](go/README.md)
- [Lua SDK](lua/README.md)
- [PHP SDK](php/README.md)
- [Python SDK](py/README.md)
- [Ruby SDK](rb/README.md)
- [TypeScript SDK](ts/README.md)

