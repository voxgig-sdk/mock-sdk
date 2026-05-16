# Mock Ruby SDK Reference

Complete API reference for the Mock Ruby SDK.


## MockSDK

### Constructor

```ruby
require_relative 'mock_sdk'

client = MockSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `MockSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = MockSDK.test
```


### Instance Methods

#### `Cart(data = nil)`

Create a new `Cart` entity instance. Pass `nil` for no initial data.

#### `Coupon(data = nil)`

Create a new `Coupon` entity instance. Pass `nil` for no initial data.

#### `CreateCustomResourceItem(data = nil)`

Create a new `CreateCustomResourceItem` entity instance. Pass `nil` for no initial data.

#### `DeleteCustomResourceItem(data = nil)`

Create a new `DeleteCustomResourceItem` entity instance. Pass `nil` for no initial data.

#### `GetCustomResource(data = nil)`

Create a new `GetCustomResource` entity instance. Pass `nil` for no initial data.

#### `GetCustomResourceItemById(data = nil)`

Create a new `GetCustomResourceItemById` entity instance. Pass `nil` for no initial data.

#### `PatchCustomResourceItem(data = nil)`

Create a new `PatchCustomResourceItem` entity instance. Pass `nil` for no initial data.

#### `Product(data = nil)`

Create a new `Product` entity instance. Pass `nil` for no initial data.

#### `Status(data = nil)`

Create a new `Status` entity instance. Pass `nil` for no initial data.

#### `UpdateCustomResourceItem(data = nil)`

Create a new `UpdateCustomResourceItem` entity instance. Pass `nil` for no initial data.

#### `User(data = nil)`

Create a new `User` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash, err`

#### `prepare(fetchargs = {}) -> Hash, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Hash, err`


---

## CartEntity

```ruby
cart = client.Cart
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | ``$STRING`` | No |  |
| `item` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Cart.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CartEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CouponEntity

```ruby
coupon = client.Coupon
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | ``$STRING`` | No |  |
| `discount` | ``$NUMBER`` | No |  |
| `id` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Coupon.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CouponEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CreateCustomResourceItemEntity

```ruby
create_custom_resource_item = client.CreateCustomResourceItem
```

### Operations

#### `create(reqdata, ctrl = nil) -> result, err`

Create a new entity with the given data.

```ruby
result, err = client.CreateCustomResourceItem.create({
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CreateCustomResourceItemEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DeleteCustomResourceItemEntity

```ruby
delete_custom_resource_item = client.DeleteCustomResourceItem
```

### Operations

#### `remove(reqmatch, ctrl = nil) -> result, err`

Remove the entity matching the given criteria.

```ruby
result, err = client.DeleteCustomResourceItem.remove({ "id" => "delete_custom_resource_item_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DeleteCustomResourceItemEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GetCustomResourceEntity

```ruby
get_custom_resource = client.GetCustomResource
```

### Operations

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.GetCustomResource.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GetCustomResourceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GetCustomResourceItemByIdEntity

```ruby
get_custom_resource_item_by_id = client.GetCustomResourceItemById
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.GetCustomResourceItemById.load({ "id" => "get_custom_resource_item_by_id_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GetCustomResourceItemByIdEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PatchCustomResourceItemEntity

```ruby
patch_custom_resource_item = client.PatchCustomResourceItem
```

### Operations

#### `update(reqdata, ctrl = nil) -> result, err`

Update an existing entity. The data must include the entity `id`.

```ruby
result, err = client.PatchCustomResourceItem.update({
  "id" => "patch_custom_resource_item_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PatchCustomResourceItemEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProductEntity

```ruby
product = client.Product
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `price` | ``$NUMBER`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Product.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Product.load({ "id" => "product_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProductEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## StatusEntity

```ruby
status = client.Status
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Status.load({ "id" => "status_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `StatusEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## UpdateCustomResourceItemEntity

```ruby
update_custom_resource_item = client.UpdateCustomResourceItem
```

### Operations

#### `update(reqdata, ctrl = nil) -> result, err`

Update an existing entity. The data must include the entity `id`.

```ruby
result, err = client.UpdateCustomResourceItem.update({
  "id" => "update_custom_resource_item_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `UpdateCustomResourceItemEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## UserEntity

```ruby
user = client.User
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `username` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.User.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `UserEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = MockSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

