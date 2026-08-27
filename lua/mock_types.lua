-- Typed models for the Mock SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Cart
---@field id? string
---@field items? table

---@class CartListMatch
---@field id? string
---@field items? table

---@class Coupon
---@field code? string
---@field discount? number
---@field id? string

---@class CouponListMatch
---@field code? string
---@field discount? number
---@field id? string

---@class CreateCustomResourceItem
---@field id? string

---@class CreateCustomResourceItemCreateData
---@field id string

---@class DeleteCustomResourceItem
---@field id? string

---@class DeleteCustomResourceItemRemoveMatch
---@field id string
---@field resource string

---@class GetCustomResource
---@field id? string

---@class GetCustomResourceListMatch
---@field id string

---@class GetCustomResourceItemById
---@field id? string

---@class GetCustomResourceItemByIdLoadMatch
---@field id string
---@field resource string

---@class PatchCustomResourceItem
---@field id? string

---@class PatchCustomResourceItemUpdateData
---@field id string
---@field resource string

---@class Product
---@field id? string
---@field name? string
---@field price? number

---@class ProductLoadMatch
---@field id string

---@class ProductListMatch
---@field id? string
---@field name? string
---@field price? number

---@class Status
---@field id? string

---@class StatusLoadMatch
---@field id number

---@class UpdateCustomResourceItem
---@field id? string

---@class UpdateCustomResourceItemUpdateData
---@field id string
---@field resource string

---@class User
---@field email? string
---@field id? string
---@field username? string

---@class UserListMatch
---@field email? string
---@field id? string
---@field username? string

local M = {}

return M
