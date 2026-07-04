<?php
declare(strict_types=1);

// Typed models for the Mock SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Cart entity data model. */
class Cart
{
    public ?string $id = null;
    public ?array $item = null;
}

/** Match filter for Cart#list (any subset of Cart fields). */
class CartListMatch
{
    public ?string $id = null;
    public ?array $item = null;
}

/** Coupon entity data model. */
class Coupon
{
    public ?string $code = null;
    public ?float $discount = null;
    public ?string $id = null;
}

/** Match filter for Coupon#list (any subset of Coupon fields). */
class CouponListMatch
{
    public ?string $code = null;
    public ?float $discount = null;
    public ?string $id = null;
}

/** CreateCustomResourceItem entity data model. */
class CreateCustomResourceItem
{
}

/** Request payload for CreateCustomResourceItem#create. */
class CreateCustomResourceItemCreateData
{
    public string $id;
}

/** DeleteCustomResourceItem entity data model. */
class DeleteCustomResourceItem
{
}

/** Request payload for DeleteCustomResourceItem#remove. */
class DeleteCustomResourceItemRemoveMatch
{
    public string $id;
    public string $resource;
}

/** GetCustomResource entity data model. */
class GetCustomResource
{
}

/** Request payload for GetCustomResource#list. */
class GetCustomResourceListMatch
{
    public string $id;
}

/** GetCustomResourceItemById entity data model. */
class GetCustomResourceItemById
{
}

/** Request payload for GetCustomResourceItemById#load. */
class GetCustomResourceItemByIdLoadMatch
{
    public string $id;
    public string $resource;
}

/** PatchCustomResourceItem entity data model. */
class PatchCustomResourceItem
{
}

/** Request payload for PatchCustomResourceItem#update. */
class PatchCustomResourceItemUpdateData
{
    public string $id;
    public string $resource;
}

/** Product entity data model. */
class Product
{
    public ?string $id = null;
    public ?string $name = null;
    public ?float $price = null;
}

/** Request payload for Product#load. */
class ProductLoadMatch
{
    public string $id;
}

/** Match filter for Product#list (any subset of Product fields). */
class ProductListMatch
{
    public ?string $id = null;
    public ?string $name = null;
    public ?float $price = null;
}

/** Status entity data model. */
class Status
{
}

/** Request payload for Status#load. */
class StatusLoadMatch
{
    public int $id;
}

/** UpdateCustomResourceItem entity data model. */
class UpdateCustomResourceItem
{
}

/** Request payload for UpdateCustomResourceItem#update. */
class UpdateCustomResourceItemUpdateData
{
    public string $id;
    public string $resource;
}

/** User entity data model. */
class User
{
    public ?string $email = null;
    public ?string $id = null;
    public ?string $username = null;
}

/** Match filter for User#list (any subset of User fields). */
class UserListMatch
{
    public ?string $email = null;
    public ?string $id = null;
    public ?string $username = null;
}

