// Typed models for the Mock SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Cart is the typed data model for the cart entity.
type Cart struct {
	Id *string `json:"id,omitempty"`
	Item *[]any `json:"item,omitempty"`
}

// CartListMatch is the typed request payload for Cart.ListTyped.
type CartListMatch struct {
	Id *string `json:"id,omitempty"`
	Item *[]any `json:"item,omitempty"`
}

// Coupon is the typed data model for the coupon entity.
type Coupon struct {
	Code *string `json:"code,omitempty"`
	Discount *float64 `json:"discount,omitempty"`
	Id *string `json:"id,omitempty"`
}

// CouponListMatch is the typed request payload for Coupon.ListTyped.
type CouponListMatch struct {
	Code *string `json:"code,omitempty"`
	Discount *float64 `json:"discount,omitempty"`
	Id *string `json:"id,omitempty"`
}

// CreateCustomResourceItem is the typed data model for the create_custom_resource_item entity.
type CreateCustomResourceItem struct {
}

// CreateCustomResourceItemCreateData is the typed request payload for CreateCustomResourceItem.CreateTyped.
type CreateCustomResourceItemCreateData struct {
	Id string `json:"id"`
}

// DeleteCustomResourceItem is the typed data model for the delete_custom_resource_item entity.
type DeleteCustomResourceItem struct {
}

// DeleteCustomResourceItemRemoveMatch is the typed request payload for DeleteCustomResourceItem.RemoveTyped.
type DeleteCustomResourceItemRemoveMatch struct {
	Id string `json:"id"`
	Resource string `json:"resource"`
}

// GetCustomResource is the typed data model for the get_custom_resource entity.
type GetCustomResource struct {
}

// GetCustomResourceListMatch is the typed request payload for GetCustomResource.ListTyped.
type GetCustomResourceListMatch struct {
	Id string `json:"id"`
}

// GetCustomResourceItemById is the typed data model for the get_custom_resource_item_by_id entity.
type GetCustomResourceItemById struct {
}

// GetCustomResourceItemByIdLoadMatch is the typed request payload for GetCustomResourceItemById.LoadTyped.
type GetCustomResourceItemByIdLoadMatch struct {
	Id string `json:"id"`
	Resource string `json:"resource"`
}

// PatchCustomResourceItem is the typed data model for the patch_custom_resource_item entity.
type PatchCustomResourceItem struct {
}

// PatchCustomResourceItemUpdateData is the typed request payload for PatchCustomResourceItem.UpdateTyped.
type PatchCustomResourceItemUpdateData struct {
	Id string `json:"id"`
	Resource string `json:"resource"`
}

// Product is the typed data model for the product entity.
type Product struct {
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Price *float64 `json:"price,omitempty"`
}

// ProductLoadMatch is the typed request payload for Product.LoadTyped.
type ProductLoadMatch struct {
	Id string `json:"id"`
}

// ProductListMatch is the typed request payload for Product.ListTyped.
type ProductListMatch struct {
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Price *float64 `json:"price,omitempty"`
}

// Status is the typed data model for the status entity.
type Status struct {
}

// StatusLoadMatch is the typed request payload for Status.LoadTyped.
type StatusLoadMatch struct {
	Id int `json:"id"`
}

// UpdateCustomResourceItem is the typed data model for the update_custom_resource_item entity.
type UpdateCustomResourceItem struct {
}

// UpdateCustomResourceItemUpdateData is the typed request payload for UpdateCustomResourceItem.UpdateTyped.
type UpdateCustomResourceItemUpdateData struct {
	Id string `json:"id"`
	Resource string `json:"resource"`
}

// User is the typed data model for the user entity.
type User struct {
	Email *string `json:"email,omitempty"`
	Id *string `json:"id,omitempty"`
	Username *string `json:"username,omitempty"`
}

// UserListMatch is the typed request payload for User.ListTyped.
type UserListMatch struct {
	Email *string `json:"email,omitempty"`
	Id *string `json:"id,omitempty"`
	Username *string `json:"username,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
