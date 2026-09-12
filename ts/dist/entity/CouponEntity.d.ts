import { MockEntityBase } from '../MockEntityBase';
import type { MockSDK } from '../MockSDK';
import type { Control } from '../types';
import type { Coupon, CouponListMatch } from '../MockTypes';
declare class CouponEntity extends MockEntityBase<Coupon> {
    constructor(client: MockSDK, entopts: any);
    make(this: CouponEntity): CouponEntity;
    list(this: any, reqmatch?: CouponListMatch, ctrl?: Control): Promise<CouponEntity[]>;
}
export { CouponEntity };
