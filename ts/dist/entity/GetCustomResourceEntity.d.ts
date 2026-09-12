import { MockEntityBase } from '../MockEntityBase';
import type { MockSDK } from '../MockSDK';
import type { Control } from '../types';
import type { GetCustomResource, GetCustomResourceListMatch } from '../MockTypes';
declare class GetCustomResourceEntity extends MockEntityBase<GetCustomResource> {
    constructor(client: MockSDK, entopts: any);
    make(this: GetCustomResourceEntity): GetCustomResourceEntity;
    list(this: any, reqmatch?: GetCustomResourceListMatch, ctrl?: Control): Promise<GetCustomResourceEntity[]>;
}
export { GetCustomResourceEntity };
