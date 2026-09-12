import { CartEntity } from './entity/CartEntity';
import { CouponEntity } from './entity/CouponEntity';
import { CreateCustomResourceItemEntity } from './entity/CreateCustomResourceItemEntity';
import { DeleteCustomResourceItemEntity } from './entity/DeleteCustomResourceItemEntity';
import { GetCustomResourceEntity } from './entity/GetCustomResourceEntity';
import { GetCustomResourceItemByIdEntity } from './entity/GetCustomResourceItemByIdEntity';
import { PatchCustomResourceItemEntity } from './entity/PatchCustomResourceItemEntity';
import { ProductEntity } from './entity/ProductEntity';
import { StatusEntity } from './entity/StatusEntity';
import { UpdateCustomResourceItemEntity } from './entity/UpdateCustomResourceItemEntity';
import { UserEntity } from './entity/UserEntity';
export type * from './MockTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { MockEntityBase } from './MockEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class MockSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Cart(entopts?: Record<string, any>): CartEntity;
    Coupon(entopts?: Record<string, any>): CouponEntity;
    CreateCustomResourceItem(entopts?: Record<string, any>): CreateCustomResourceItemEntity;
    DeleteCustomResourceItem(entopts?: Record<string, any>): DeleteCustomResourceItemEntity;
    GetCustomResource(entopts?: Record<string, any>): GetCustomResourceEntity;
    GetCustomResourceItemById(entopts?: Record<string, any>): GetCustomResourceItemByIdEntity;
    PatchCustomResourceItem(entopts?: Record<string, any>): PatchCustomResourceItemEntity;
    Product(entopts?: Record<string, any>): ProductEntity;
    Status(entopts?: Record<string, any>): StatusEntity;
    UpdateCustomResourceItem(entopts?: Record<string, any>): UpdateCustomResourceItemEntity;
    User(entopts?: Record<string, any>): UserEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): MockSDK;
    tester(testopts?: any, sdkopts?: any): MockSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof MockSDK;
export { stdutil, config, BaseFeature, MockEntityBase, MockSDK, SDK, };
