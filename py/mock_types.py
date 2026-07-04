# Typed models for the Mock SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Cart:
    id: Optional[str] = None
    item: Optional[list] = None


@dataclass
class CartListMatch:
    id: Optional[str] = None
    item: Optional[list] = None


@dataclass
class Coupon:
    code: Optional[str] = None
    discount: Optional[float] = None
    id: Optional[str] = None


@dataclass
class CouponListMatch:
    code: Optional[str] = None
    discount: Optional[float] = None
    id: Optional[str] = None


@dataclass
class CreateCustomResourceItem:
    pass


@dataclass
class CreateCustomResourceItemCreateData:
    id: str


@dataclass
class DeleteCustomResourceItem:
    pass


@dataclass
class DeleteCustomResourceItemRemoveMatch:
    id: str
    resource: str


@dataclass
class GetCustomResource:
    pass


@dataclass
class GetCustomResourceListMatch:
    id: str


@dataclass
class GetCustomResourceItemById:
    pass


@dataclass
class GetCustomResourceItemByIdLoadMatch:
    id: str
    resource: str


@dataclass
class PatchCustomResourceItem:
    pass


@dataclass
class PatchCustomResourceItemUpdateData:
    id: str
    resource: str


@dataclass
class Product:
    id: Optional[str] = None
    name: Optional[str] = None
    price: Optional[float] = None


@dataclass
class ProductLoadMatch:
    id: str


@dataclass
class ProductListMatch:
    id: Optional[str] = None
    name: Optional[str] = None
    price: Optional[float] = None


@dataclass
class Status:
    pass


@dataclass
class StatusLoadMatch:
    id: int


@dataclass
class UpdateCustomResourceItem:
    pass


@dataclass
class UpdateCustomResourceItemUpdateData:
    id: str
    resource: str


@dataclass
class User:
    email: Optional[str] = None
    id: Optional[str] = None
    username: Optional[str] = None


@dataclass
class UserListMatch:
    email: Optional[str] = None
    id: Optional[str] = None
    username: Optional[str] = None

