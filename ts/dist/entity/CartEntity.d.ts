import { MockEntityBase } from '../MockEntityBase';
import type { MockSDK } from '../MockSDK';
import type { Control } from '../types';
import type { Cart, CartListMatch } from '../MockTypes';
declare class CartEntity extends MockEntityBase<Cart> {
    constructor(client: MockSDK, entopts: any);
    make(this: CartEntity): CartEntity;
    list(this: any, reqmatch?: CartListMatch, ctrl?: Control): Promise<CartEntity[]>;
}
export { CartEntity };
