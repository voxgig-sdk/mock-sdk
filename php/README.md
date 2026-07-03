# Mock PHP SDK



The PHP SDK for the Mock API — an entity-oriented client using PHP conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
composer require voxgig/mock-sdk
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'mock_sdk.php';

$client = new MockSDK([
    "apikey" => getenv("MOCK_APIKEY"),
]);
```

### 2. List carts

```php
[$result, $err] = $client->Cart()->list();
if ($err) { throw new \Exception($err); }

if (is_array($result)) {
    foreach ($result as $item) {
        $d = $item->data_get();
        echo $d["id"] . " " . $d["name"] . "\n";
    }
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
if ($err) { throw new \Exception($err); }

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
}
```

### Prepare a request without sending it

```php
[$fetchdef, $err] = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);
if ($err) { throw new \Exception($err); }

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = MockSDK::test();

[$result, $err] = $client->Mock()->load(["id" => "test01"]);
// $result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new MockSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
MOCK_TEST_LIVE=TRUE
MOCK_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### MockSDK

```php
require_once 'mock_sdk.php';
$client = new MockSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = MockSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### MockSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Cart` | `($data): CartEntity` | Create a Cart entity instance. |
| `Coupon` | `($data): CouponEntity` | Create a Coupon entity instance. |
| `CreateCustomResourceItem` | `($data): CreateCustomResourceItemEntity` | Create a CreateCustomResourceItem entity instance. |
| `DeleteCustomResourceItem` | `($data): DeleteCustomResourceItemEntity` | Create a DeleteCustomResourceItem entity instance. |
| `GetCustomResource` | `($data): GetCustomResourceEntity` | Create a GetCustomResource entity instance. |
| `GetCustomResourceItemById` | `($data): GetCustomResourceItemByIdEntity` | Create a GetCustomResourceItemById entity instance. |
| `PatchCustomResourceItem` | `($data): PatchCustomResourceItemEntity` | Create a PatchCustomResourceItem entity instance. |
| `Product` | `($data): ProductEntity` | Create a Product entity instance. |
| `Status` | `($data): StatusEntity` | Create a Status entity instance. |
| `UpdateCustomResourceItem` | `($data): UpdateCustomResourceItemEntity` | Create a UpdateCustomResourceItem entity instance. |
| `User` | `($data): UserEntity` | Create a User entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `($reqmatch, $ctrl): array` | List entities matching the criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return `[$result, $err]`. The first value is an
`array` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### Cart

| Field | Description |
| --- | --- |
| `id` |  |
| `item` |  |

Operations: List.

API path: `/public/carts`

#### Coupon

| Field | Description |
| --- | --- |
| `code` |  |
| `discount` |  |
| `id` |  |

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
| `id` |  |
| `name` |  |
| `price` |  |

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
| `email` |  |
| `id` |  |
| `username` |  |

Operations: List.

API path: `/public/users`



## Entities


### Cart

Create an instance: `const cart = client.Cart()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | ``$STRING`` |  |
| `item` | ``$ARRAY`` |  |

#### Example: List

```ts
const carts = await client.Cart().list()
```


### Coupon

Create an instance: `const coupon = client.Coupon()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | ``$STRING`` |  |
| `discount` | ``$NUMBER`` |  |
| `id` | ``$STRING`` |  |

#### Example: List

```ts
const coupons = await client.Coupon().list()
```


### CreateCustomResourceItem

Create an instance: `const create_custom_resource_item = client.CreateCustomResourceItem()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const create_custom_resource_item = await client.CreateCustomResourceItem().create({
})
```


### DeleteCustomResourceItem

Create an instance: `const delete_custom_resource_item = client.DeleteCustomResourceItem()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### GetCustomResource

Create an instance: `const get_custom_resource = client.GetCustomResource()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ts
const get_custom_resources = await client.GetCustomResource().list()
```


### GetCustomResourceItemById

Create an instance: `const get_custom_resource_item_by_id = client.GetCustomResourceItemById()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const get_custom_resource_item_by_id = await client.GetCustomResourceItemById().load({ id: 'get_custom_resource_item_by_id_id' })
```


### PatchCustomResourceItem

Create an instance: `const patch_custom_resource_item = client.PatchCustomResourceItem()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |


### Product

Create an instance: `const product = client.Product()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `price` | ``$NUMBER`` |  |

#### Example: Load

```ts
const product = await client.Product().load({ id: 'product_id' })
```

#### Example: List

```ts
const products = await client.Product().list()
```


### Status

Create an instance: `const status = client.Status()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const status = await client.Status().load({ id: 'status_id' })
```


### UpdateCustomResourceItem

Create an instance: `const update_custom_resource_item = client.UpdateCustomResourceItem()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |


### User

Create an instance: `const user = client.User()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `username` | ``$STRING`` |  |

#### Example: List

```ts
const users = await client.User().list()
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
error is returned to the caller as the second element in the return array.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── mock_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`mock_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$moon = $client->Moon();
[$result, $err] = $moon->load(["planet_id" => "earth", "id" => "luna"]);

// $moon->dataGet() now returns the loaded moon data
// $moon->matchGet() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
