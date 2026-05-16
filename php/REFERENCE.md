# Mock PHP SDK Reference

Complete API reference for the Mock PHP SDK.


## MockSDK

### Constructor

```php
require_once __DIR__ . '/mock_sdk.php';

$client = new MockSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `MockSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = MockSDK::test();
```


### Instance Methods

#### `Cart($data = null)`

Create a new `CartEntity` instance. Pass `null` for no initial data.

#### `Coupon($data = null)`

Create a new `CouponEntity` instance. Pass `null` for no initial data.

#### `CreateCustomResourceItem($data = null)`

Create a new `CreateCustomResourceItemEntity` instance. Pass `null` for no initial data.

#### `DeleteCustomResourceItem($data = null)`

Create a new `DeleteCustomResourceItemEntity` instance. Pass `null` for no initial data.

#### `GetCustomResource($data = null)`

Create a new `GetCustomResourceEntity` instance. Pass `null` for no initial data.

#### `GetCustomResourceItemById($data = null)`

Create a new `GetCustomResourceItemByIdEntity` instance. Pass `null` for no initial data.

#### `PatchCustomResourceItem($data = null)`

Create a new `PatchCustomResourceItemEntity` instance. Pass `null` for no initial data.

#### `Product($data = null)`

Create a new `ProductEntity` instance. Pass `null` for no initial data.

#### `Status($data = null)`

Create a new `StatusEntity` instance. Pass `null` for no initial data.

#### `UpdateCustomResourceItem($data = null)`

Create a new `UpdateCustomResourceItemEntity` instance. Pass `null` for no initial data.

#### `User($data = null)`

Create a new `UserEntity` instance. Pass `null` for no initial data.

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. Returns `[$result, $err]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array [$result, $err]`

#### `prepare(array $fetchargs = []): array`

Prepare a fetch definition without sending the request. Returns `[$fetchdef, $err]`.


---

## CartEntity

```php
$cart = $client->Cart();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | ``$STRING`` | No |  |
| `item` | ``$ARRAY`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Cart()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CartEntity`

Create a new `CartEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CouponEntity

```php
$coupon = $client->Coupon();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | ``$STRING`` | No |  |
| `discount` | ``$NUMBER`` | No |  |
| `id` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Coupon()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CouponEntity`

Create a new `CouponEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CreateCustomResourceItemEntity

```php
$create_custom_resource_item = $client->CreateCustomResourceItem();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): array`

Create a new entity with the given data.

```php
[$result, $err] = $client->CreateCustomResourceItem()->create([
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CreateCustomResourceItemEntity`

Create a new `CreateCustomResourceItemEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## DeleteCustomResourceItemEntity

```php
$delete_custom_resource_item = $client->DeleteCustomResourceItem();
```

### Operations

#### `remove(array $reqmatch, ?array $ctrl = null): array`

Remove the entity matching the given criteria.

```php
[$result, $err] = $client->DeleteCustomResourceItem()->remove(["id" => "delete_custom_resource_item_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): DeleteCustomResourceItemEntity`

Create a new `DeleteCustomResourceItemEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## GetCustomResourceEntity

```php
$get_custom_resource = $client->GetCustomResource();
```

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->GetCustomResource()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GetCustomResourceEntity`

Create a new `GetCustomResourceEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## GetCustomResourceItemByIdEntity

```php
$get_custom_resource_item_by_id = $client->GetCustomResourceItemById();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->GetCustomResourceItemById()->load(["id" => "get_custom_resource_item_by_id_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GetCustomResourceItemByIdEntity`

Create a new `GetCustomResourceItemByIdEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PatchCustomResourceItemEntity

```php
$patch_custom_resource_item = $client->PatchCustomResourceItem();
```

### Operations

#### `update(array $reqdata, ?array $ctrl = null): array`

Update an existing entity. The data must include the entity `id`.

```php
[$result, $err] = $client->PatchCustomResourceItem()->update([
  "id" => "patch_custom_resource_item_id",
  // Fields to update
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PatchCustomResourceItemEntity`

Create a new `PatchCustomResourceItemEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ProductEntity

```php
$product = $client->Product();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `price` | ``$NUMBER`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Product()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Product()->load(["id" => "product_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ProductEntity`

Create a new `ProductEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## StatusEntity

```php
$status = $client->Status();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Status()->load(["id" => "status_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): StatusEntity`

Create a new `StatusEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## UpdateCustomResourceItemEntity

```php
$update_custom_resource_item = $client->UpdateCustomResourceItem();
```

### Operations

#### `update(array $reqdata, ?array $ctrl = null): array`

Update an existing entity. The data must include the entity `id`.

```php
[$result, $err] = $client->UpdateCustomResourceItem()->update([
  "id" => "update_custom_resource_item_id",
  // Fields to update
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): UpdateCustomResourceItemEntity`

Create a new `UpdateCustomResourceItemEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## UserEntity

```php
$user = $client->User();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `username` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->User()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): UserEntity`

Create a new `UserEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new MockSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

