# Mock Golang SDK

The Golang SDK for the Mock API. Provides an entity-oriented interface using standard Go conventions — no generics required, data flows as `map[string]any`.


## Install
```bash
go get github.com/voxgig-sdk/mock-sdk
```

If the module is not yet published to a registry, use a `replace` directive
in your `go.mod` to point to a local checkout:

```bash
go mod edit -replace github.com/voxgig-sdk/mock-sdk=../path/to/github.com/voxgig-sdk/mock-sdk
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```go
package main

import (
    "fmt"
    "os"

    sdk "github.com/voxgig-sdk/mock-sdk"
    "github.com/voxgig-sdk/mock-sdk/core"
)

func main() {
    client := sdk.NewMockSDK(map[string]any{
        "apikey": os.Getenv("MOCK_APIKEY"),
    })
```

### 2. List carts

```go
    result, err := client.Cart(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }

    rm := core.ToMapAny(result)
    if rm["ok"] == true {
        for _, item := range rm["data"].([]any) {
            p := core.ToMapAny(item)
            fmt.Println(p["id"], p["name"])
        }
    }
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.TestSDK(nil, nil)

result, err := client.Planet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
// result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewMockSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
MOCK_TEST_LIVE=TRUE
MOCK_APIKEY=<your-key>
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewMockSDK

```go
func NewMockSDK(options map[string]any) *MockSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *MockSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### MockSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Cart` | `(data map[string]any) MockEntity` | Create a Cart entity instance. |
| `Coupon` | `(data map[string]any) MockEntity` | Create a Coupon entity instance. |
| `CreateCustomResourceItem` | `(data map[string]any) MockEntity` | Create a CreateCustomResourceItem entity instance. |
| `DeleteCustomResourceItem` | `(data map[string]any) MockEntity` | Create a DeleteCustomResourceItem entity instance. |
| `GetCustomResource` | `(data map[string]any) MockEntity` | Create a GetCustomResource entity instance. |
| `GetCustomResourceItemById` | `(data map[string]any) MockEntity` | Create a GetCustomResourceItemById entity instance. |
| `PatchCustomResourceItem` | `(data map[string]any) MockEntity` | Create a PatchCustomResourceItem entity instance. |
| `Product` | `(data map[string]any) MockEntity` | Create a Product entity instance. |
| `Status` | `(data map[string]any) MockEntity` | Create a Status entity instance. |
| `UpdateCustomResourceItem` | `(data map[string]any) MockEntity` | Create a UpdateCustomResourceItem entity instance. |
| `User` | `(data map[string]any) MockEntity` | Create a User entity instance. |

### Entity interface (MockEntity)

All entities implement the `MockEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(any, error)`. The `any` value is a
`map[string]any` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `"ok"` | `bool` | `true` if the HTTP status is 2xx. |
| `"status"` | `int` | HTTP status code. |
| `"headers"` | `map[string]any` | Response headers. |
| `"data"` | `any` | Parsed JSON response body. |

On error, `"ok"` is `false` and `"err"` contains the error value.

### Entities

#### Cart

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"item"` |  |

Operations: List.

API path: `/public/carts`

#### Coupon

| Field | Description |
| --- | --- |
| `"code"` |  |
| `"discount"` |  |
| `"id"` |  |

Operations: List.

API path: `/public/coupons`

#### CreateCustomResourceItem

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/{resource}`

#### DeleteCustomResourceItem

| Field | Description |
| --- | --- |

Operations: Remove.

API path: `/{resource}/{id}`

#### GetCustomResource

| Field | Description |
| --- | --- |

Operations: List.

API path: `/{resource}`

#### GetCustomResourceItemById

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/{resource}/{id}`

#### PatchCustomResourceItem

| Field | Description |
| --- | --- |

Operations: Update.

API path: `/{resource}/{id}`

#### Product

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"name"` |  |
| `"price"` |  |

Operations: List, Load.

API path: `/public/products`

#### Status

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/public/status/{code}`

#### UpdateCustomResourceItem

| Field | Description |
| --- | --- |

Operations: Update.

API path: `/{resource}/{id}`

#### User

| Field | Description |
| --- | --- |
| `"email"` |  |
| `"id"` |  |
| `"username"` |  |

Operations: List.

API path: `/public/users`



## Entities


### Cart

Create an instance: `cart := client.Cart(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | ``$STRING`` |  |
| `item` | ``$ARRAY`` |  |

#### Example: List

```go
results, err := client.Cart(nil).List(nil, nil)
```


### Coupon

Create an instance: `coupon := client.Coupon(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | ``$STRING`` |  |
| `discount` | ``$NUMBER`` |  |
| `id` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.Coupon(nil).List(nil, nil)
```


### CreateCustomResourceItem

Create an instance: `create_custom_resource_item := client.CreateCustomResourceItem(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.CreateCustomResourceItem(nil).Create(map[string]any{
}, nil)
```


### DeleteCustomResourceItem

Create an instance: `delete_custom_resource_item := client.DeleteCustomResourceItem(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Remove(match, ctrl)` | Remove the matching entity. |


### GetCustomResource

Create an instance: `get_custom_resource := client.GetCustomResource(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Example: List

```go
results, err := client.GetCustomResource(nil).List(nil, nil)
```


### GetCustomResourceItemById

Create an instance: `get_custom_resource_item_by_id := client.GetCustomResourceItemById(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.GetCustomResourceItemById(nil).Load(map[string]any{"id": "get_custom_resource_item_by_id_id"}, nil)
```


### PatchCustomResourceItem

Create an instance: `patch_custom_resource_item := client.PatchCustomResourceItem(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Update(data, ctrl)` | Update an existing entity. |


### Product

Create an instance: `product := client.Product(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `price` | ``$NUMBER`` |  |

#### Example: Load

```go
result, err := client.Product(nil).Load(map[string]any{"id": "product_id"}, nil)
```

#### Example: List

```go
results, err := client.Product(nil).List(nil, nil)
```


### Status

Create an instance: `status := client.Status(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.Status(nil).Load(map[string]any{"id": "status_id"}, nil)
```


### UpdateCustomResourceItem

Create an instance: `update_custom_resource_item := client.UpdateCustomResourceItem(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Update(data, ctrl)` | Update an existing entity. |


### User

Create an instance: `user := client.User(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `username` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.User(nil).List(nil, nil)
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/mock-sdk/
├── mock.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/mock-sdk`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
moon := client.Moon(nil)
moon.Load(map[string]any{"planet_id": "earth", "id": "luna"}, nil)

// moon.Data() now returns the loaded moon data
// moon.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
