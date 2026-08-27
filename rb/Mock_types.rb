# frozen_string_literal: true

# Typed models for the Mock SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Cart entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] items
#   @return [Array, nil]
Cart = Struct.new(
  :id,
  :items,
  keyword_init: true
)

# Request payload for Cart#list.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] items
#   @return [Array, nil]
CartListMatch = Struct.new(
  :id,
  :items,
  keyword_init: true
)

# Coupon entity data model.
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] discount
#   @return [Float, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
Coupon = Struct.new(
  :code,
  :discount,
  :id,
  keyword_init: true
)

# Request payload for Coupon#list.
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] discount
#   @return [Float, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
CouponListMatch = Struct.new(
  :code,
  :discount,
  :id,
  keyword_init: true
)

# CreateCustomResourceItem entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
CreateCustomResourceItem = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for CreateCustomResourceItem#create.
#
# @!attribute [rw] id
#   @return [String]
CreateCustomResourceItemCreateData = Struct.new(
  :id,
  keyword_init: true
)

# DeleteCustomResourceItem entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
DeleteCustomResourceItem = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for DeleteCustomResourceItem#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] resource
#   @return [String]
DeleteCustomResourceItemRemoveMatch = Struct.new(
  :id,
  :resource,
  keyword_init: true
)

# GetCustomResource entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
GetCustomResource = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for GetCustomResource#list.
#
# @!attribute [rw] id
#   @return [String]
GetCustomResourceListMatch = Struct.new(
  :id,
  keyword_init: true
)

# GetCustomResourceItemById entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
GetCustomResourceItemById = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for GetCustomResourceItemById#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] resource
#   @return [String]
GetCustomResourceItemByIdLoadMatch = Struct.new(
  :id,
  :resource,
  keyword_init: true
)

# PatchCustomResourceItem entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
PatchCustomResourceItem = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for PatchCustomResourceItem#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] resource
#   @return [String]
PatchCustomResourceItemUpdateData = Struct.new(
  :id,
  :resource,
  keyword_init: true
)

# Product entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] price
#   @return [Float, nil]
Product = Struct.new(
  :id,
  :name,
  :price,
  keyword_init: true
)

# Request payload for Product#load.
#
# @!attribute [rw] id
#   @return [String]
ProductLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Product#list.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] price
#   @return [Float, nil]
ProductListMatch = Struct.new(
  :id,
  :name,
  :price,
  keyword_init: true
)

# Status entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
Status = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Status#load.
#
# @!attribute [rw] id
#   @return [Integer]
StatusLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# UpdateCustomResourceItem entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
UpdateCustomResourceItem = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for UpdateCustomResourceItem#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] resource
#   @return [String]
UpdateCustomResourceItemUpdateData = Struct.new(
  :id,
  :resource,
  keyword_init: true
)

# User entity data model.
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] username
#   @return [String, nil]
User = Struct.new(
  :email,
  :id,
  :username,
  keyword_init: true
)

# Request payload for User#list.
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] username
#   @return [String, nil]
UserListMatch = Struct.new(
  :email,
  :id,
  :username,
  keyword_init: true
)

