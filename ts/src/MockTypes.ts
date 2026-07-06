// Typed models for the Mock SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Cart {
  id?: string
  item?: any[]
}

export interface CartListMatch {
  id?: string
  item?: any[]
}

export interface Coupon {
  code?: string
  discount?: number
  id?: string
}

export interface CouponListMatch {
  code?: string
  discount?: number
  id?: string
}

export interface CreateCustomResourceItem {
}

export interface CreateCustomResourceItemCreateData {
  id: string
}

export interface DeleteCustomResourceItem {
}

export interface DeleteCustomResourceItemRemoveMatch {
  id: string
  resource: string
}

export interface GetCustomResource {
}

export interface GetCustomResourceListMatch {
  id: string
}

export interface GetCustomResourceItemById {
}

export interface GetCustomResourceItemByIdLoadMatch {
  id: string
  resource: string
}

export interface PatchCustomResourceItem {
}

export interface PatchCustomResourceItemUpdateData {
  id: string
  resource: string
}

export interface Product {
  id?: string
  name?: string
  price?: number
}

export interface ProductLoadMatch {
  id: string
}

export interface ProductListMatch {
  id?: string
  name?: string
  price?: number
}

export interface Status {
}

export interface StatusLoadMatch {
  id: number
}

export interface UpdateCustomResourceItem {
}

export interface UpdateCustomResourceItemUpdateData {
  id: string
  resource: string
}

export interface User {
  email?: string
  id?: string
  username?: string
}

export interface UserListMatch {
  email?: string
  id?: string
  username?: string
}

