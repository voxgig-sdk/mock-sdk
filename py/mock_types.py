# Typed models for the Mock SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Cart(TypedDict, total=False):
    id: str
    item: list


class CartListMatch(TypedDict, total=False):
    id: str
    item: list


class Coupon(TypedDict, total=False):
    code: str
    discount: float
    id: str


class CouponListMatch(TypedDict, total=False):
    code: str
    discount: float
    id: str


class CreateCustomResourceItem(TypedDict):
    pass


class CreateCustomResourceItemCreateData(TypedDict):
    id: str


class DeleteCustomResourceItem(TypedDict):
    pass


class DeleteCustomResourceItemRemoveMatch(TypedDict):
    id: str
    resource: str


class GetCustomResource(TypedDict):
    pass


class GetCustomResourceListMatch(TypedDict):
    id: str


class GetCustomResourceItemById(TypedDict):
    pass


class GetCustomResourceItemByIdLoadMatch(TypedDict):
    id: str
    resource: str


class PatchCustomResourceItem(TypedDict):
    pass


class PatchCustomResourceItemUpdateData(TypedDict):
    id: str
    resource: str


class Product(TypedDict, total=False):
    id: str
    name: str
    price: float


class ProductLoadMatch(TypedDict):
    id: str


class ProductListMatch(TypedDict, total=False):
    id: str
    name: str
    price: float


class Status(TypedDict):
    pass


class StatusLoadMatch(TypedDict, total=False):
    id: int


class UpdateCustomResourceItem(TypedDict):
    pass


class UpdateCustomResourceItemUpdateData(TypedDict):
    id: str
    resource: str


class User(TypedDict, total=False):
    email: str
    id: str
    username: str


class UserListMatch(TypedDict, total=False):
    email: str
    id: str
    username: str
