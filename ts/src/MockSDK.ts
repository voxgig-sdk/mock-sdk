// Mock Ts SDK

import { CartEntity } from './entity/CartEntity'
import { CouponEntity } from './entity/CouponEntity'
import { CreateCustomResourceItemEntity } from './entity/CreateCustomResourceItemEntity'
import { DeleteCustomResourceItemEntity } from './entity/DeleteCustomResourceItemEntity'
import { GetCustomResourceEntity } from './entity/GetCustomResourceEntity'
import { GetCustomResourceItemByIdEntity } from './entity/GetCustomResourceItemByIdEntity'
import { PatchCustomResourceItemEntity } from './entity/PatchCustomResourceItemEntity'
import { ProductEntity } from './entity/ProductEntity'
import { StatusEntity } from './entity/StatusEntity'
import { UpdateCustomResourceItemEntity } from './entity/UpdateCustomResourceItemEntity'
import { UserEntity } from './entity/UserEntity'

export type * from './MockTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { MockEntityBase } from './MockEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class MockSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath
    const items = struct.items

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    items(this._options.feature, (fitem: [string, any]) => {
      const fname = fitem[0]
      const fopts = fitem[1]
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    })

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
    const utility = this._utility
    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  _cart?: CartEntity

  // Idiomatic facade: `client.cart.list()` / `client.cart.load({ id })`.
  get cart(): CartEntity {
    return (this._cart ??= new CartEntity(this, undefined))
  }

  /** @deprecated Use `client.cart` instead. */
  Cart(data?: any) {
    const self = this
    return new CartEntity(self,data)
  }


  _coupon?: CouponEntity

  // Idiomatic facade: `client.coupon.list()` / `client.coupon.load({ id })`.
  get coupon(): CouponEntity {
    return (this._coupon ??= new CouponEntity(this, undefined))
  }

  /** @deprecated Use `client.coupon` instead. */
  Coupon(data?: any) {
    const self = this
    return new CouponEntity(self,data)
  }


  _create_custom_resource_item?: CreateCustomResourceItemEntity

  // Idiomatic facade: `client.create_custom_resource_item.list()` / `client.create_custom_resource_item.load({ id })`.
  get create_custom_resource_item(): CreateCustomResourceItemEntity {
    return (this._create_custom_resource_item ??= new CreateCustomResourceItemEntity(this, undefined))
  }

  /** @deprecated Use `client.create_custom_resource_item` instead. */
  CreateCustomResourceItem(data?: any) {
    const self = this
    return new CreateCustomResourceItemEntity(self,data)
  }


  _delete_custom_resource_item?: DeleteCustomResourceItemEntity

  // Idiomatic facade: `client.delete_custom_resource_item.list()` / `client.delete_custom_resource_item.load({ id })`.
  get delete_custom_resource_item(): DeleteCustomResourceItemEntity {
    return (this._delete_custom_resource_item ??= new DeleteCustomResourceItemEntity(this, undefined))
  }

  /** @deprecated Use `client.delete_custom_resource_item` instead. */
  DeleteCustomResourceItem(data?: any) {
    const self = this
    return new DeleteCustomResourceItemEntity(self,data)
  }


  _get_custom_resource?: GetCustomResourceEntity

  // Idiomatic facade: `client.get_custom_resource.list()` / `client.get_custom_resource.load({ id })`.
  get get_custom_resource(): GetCustomResourceEntity {
    return (this._get_custom_resource ??= new GetCustomResourceEntity(this, undefined))
  }

  /** @deprecated Use `client.get_custom_resource` instead. */
  GetCustomResource(data?: any) {
    const self = this
    return new GetCustomResourceEntity(self,data)
  }


  _get_custom_resource_item_by_id?: GetCustomResourceItemByIdEntity

  // Idiomatic facade: `client.get_custom_resource_item_by_id.list()` / `client.get_custom_resource_item_by_id.load({ id })`.
  get get_custom_resource_item_by_id(): GetCustomResourceItemByIdEntity {
    return (this._get_custom_resource_item_by_id ??= new GetCustomResourceItemByIdEntity(this, undefined))
  }

  /** @deprecated Use `client.get_custom_resource_item_by_id` instead. */
  GetCustomResourceItemById(data?: any) {
    const self = this
    return new GetCustomResourceItemByIdEntity(self,data)
  }


  _patch_custom_resource_item?: PatchCustomResourceItemEntity

  // Idiomatic facade: `client.patch_custom_resource_item.list()` / `client.patch_custom_resource_item.load({ id })`.
  get patch_custom_resource_item(): PatchCustomResourceItemEntity {
    return (this._patch_custom_resource_item ??= new PatchCustomResourceItemEntity(this, undefined))
  }

  /** @deprecated Use `client.patch_custom_resource_item` instead. */
  PatchCustomResourceItem(data?: any) {
    const self = this
    return new PatchCustomResourceItemEntity(self,data)
  }


  _product?: ProductEntity

  // Idiomatic facade: `client.product.list()` / `client.product.load({ id })`.
  get product(): ProductEntity {
    return (this._product ??= new ProductEntity(this, undefined))
  }

  /** @deprecated Use `client.product` instead. */
  Product(data?: any) {
    const self = this
    return new ProductEntity(self,data)
  }


  _status?: StatusEntity

  // Idiomatic facade: `client.status.list()` / `client.status.load({ id })`.
  get status(): StatusEntity {
    return (this._status ??= new StatusEntity(this, undefined))
  }

  /** @deprecated Use `client.status` instead. */
  Status(data?: any) {
    const self = this
    return new StatusEntity(self,data)
  }


  _update_custom_resource_item?: UpdateCustomResourceItemEntity

  // Idiomatic facade: `client.update_custom_resource_item.list()` / `client.update_custom_resource_item.load({ id })`.
  get update_custom_resource_item(): UpdateCustomResourceItemEntity {
    return (this._update_custom_resource_item ??= new UpdateCustomResourceItemEntity(this, undefined))
  }

  /** @deprecated Use `client.update_custom_resource_item` instead. */
  UpdateCustomResourceItem(data?: any) {
    const self = this
    return new UpdateCustomResourceItemEntity(self,data)
  }


  _user?: UserEntity

  // Idiomatic facade: `client.user.list()` / `client.user.load({ id })`.
  get user(): UserEntity {
    return (this._user ??= new UserEntity(this, undefined))
  }

  /** @deprecated Use `client.user` instead. */
  User(data?: any) {
    const self = this
    return new UserEntity(self,data)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new MockSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return MockSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'Mock' }
  }

  toString() {
    return 'Mock ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = MockSDK


export {
  stdutil,

  BaseFeature,
  MockEntityBase,

  MockSDK,
  SDK,
}


