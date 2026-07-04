-- Typed models for the Mock SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Cart
---@field id? string
---@field item? table

---@class CartListMatch

---@class Coupon
---@field code? string
---@field discount? number
---@field id? string

---@class CouponListMatch

---@class CreateCustomResourceItem

---@class CreateCustomResourceItemCreateData
---@field id string

---@class DeleteCustomResourceItem

---@class DeleteCustomResourceItemRemoveMatch
---@field id string
---@field resource string

---@class GetCustomResource

---@class GetCustomResourceListMatch
---@field id string

---@class GetCustomResourceItemById

---@class GetCustomResourceItemByIdLoadMatch
---@field id string
---@field resource string

---@class PatchCustomResourceItem

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

---@class Status

---@class StatusLoadMatch
---@field id number

---@class UpdateCustomResourceItem

---@class UpdateCustomResourceItemUpdateData
---@field id string
---@field resource string

---@class User
---@field email? string
---@field id? string
---@field username? string

---@class UserListMatch

local M = {}

return M
