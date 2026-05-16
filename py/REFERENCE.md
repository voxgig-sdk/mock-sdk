# Mock Python SDK Reference

Complete API reference for the Mock Python SDK.


## MockSDK

### Constructor

```python
from mock_sdk import MockSDK

client = MockSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `MockSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = MockSDK.test()
```


### Instance Methods

#### `Cart(data=None)`

Create a new `CartEntity` instance. Pass `None` for no initial data.

#### `Coupon(data=None)`

Create a new `CouponEntity` instance. Pass `None` for no initial data.

#### `CreateCustomResourceItem(data=None)`

Create a new `CreateCustomResourceItemEntity` instance. Pass `None` for no initial data.

#### `DeleteCustomResourceItem(data=None)`

Create a new `DeleteCustomResourceItemEntity` instance. Pass `None` for no initial data.

#### `GetCustomResource(data=None)`

Create a new `GetCustomResourceEntity` instance. Pass `None` for no initial data.

#### `GetCustomResourceItemById(data=None)`

Create a new `GetCustomResourceItemByIdEntity` instance. Pass `None` for no initial data.

#### `PatchCustomResourceItem(data=None)`

Create a new `PatchCustomResourceItemEntity` instance. Pass `None` for no initial data.

#### `Product(data=None)`

Create a new `ProductEntity` instance. Pass `None` for no initial data.

#### `Status(data=None)`

Create a new `StatusEntity` instance. Pass `None` for no initial data.

#### `UpdateCustomResourceItem(data=None)`

Create a new `UpdateCustomResourceItemEntity` instance. Pass `None` for no initial data.

#### `User(data=None)`

Create a new `UserEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> tuple`

Make a direct HTTP request to any API endpoint. Returns `(result, err)`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `(result_dict, err)`

#### `prepare(fetchargs=None) -> tuple`

Prepare a fetch definition without sending. Returns `(fetchdef, err)`.


---

## CartEntity

```python
cart = client.Cart()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | ``$STRING`` | No |  |
| `item` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Cart().list({})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CartEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CouponEntity

```python
coupon = client.Coupon()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | ``$STRING`` | No |  |
| `discount` | ``$NUMBER`` | No |  |
| `id` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Coupon().list({})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CouponEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CreateCustomResourceItemEntity

```python
create_custom_resource_item = client.CreateCustomResourceItem()
```

### Operations

#### `create(reqdata, ctrl=None) -> tuple`

Create a new entity with the given data.

```python
result, err = client.CreateCustomResourceItem().create({
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CreateCustomResourceItemEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DeleteCustomResourceItemEntity

```python
delete_custom_resource_item = client.DeleteCustomResourceItem()
```

### Operations

#### `remove(reqmatch, ctrl=None) -> tuple`

Remove the entity matching the given criteria.

```python
result, err = client.DeleteCustomResourceItem().remove({"id": "delete_custom_resource_item_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeleteCustomResourceItemEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GetCustomResourceEntity

```python
get_custom_resource = client.GetCustomResource()
```

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.GetCustomResource().list({})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GetCustomResourceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GetCustomResourceItemByIdEntity

```python
get_custom_resource_item_by_id = client.GetCustomResourceItemById()
```

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.GetCustomResourceItemById().load({"id": "get_custom_resource_item_by_id_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GetCustomResourceItemByIdEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PatchCustomResourceItemEntity

```python
patch_custom_resource_item = client.PatchCustomResourceItem()
```

### Operations

#### `update(reqdata, ctrl=None) -> tuple`

Update an existing entity. The data must include the entity `id`.

```python
result, err = client.PatchCustomResourceItem().update({
    "id": "patch_custom_resource_item_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PatchCustomResourceItemEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProductEntity

```python
product = client.Product()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `price` | ``$NUMBER`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Product().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Product().load({"id": "product_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProductEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## StatusEntity

```python
status = client.Status()
```

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Status().load({"id": "status_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StatusEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UpdateCustomResourceItemEntity

```python
update_custom_resource_item = client.UpdateCustomResourceItem()
```

### Operations

#### `update(reqdata, ctrl=None) -> tuple`

Update an existing entity. The data must include the entity `id`.

```python
result, err = client.UpdateCustomResourceItem().update({
    "id": "update_custom_resource_item_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UpdateCustomResourceItemEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UserEntity

```python
user = client.User()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `username` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.User().list({})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = MockSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

