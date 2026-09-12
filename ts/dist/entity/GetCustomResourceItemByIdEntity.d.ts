import { MockEntityBase } from '../MockEntityBase';
import type { MockSDK } from '../MockSDK';
import type { Control } from '../types';
import type { GetCustomResourceItemById, GetCustomResourceItemByIdLoadMatch } from '../MockTypes';
declare class GetCustomResourceItemByIdEntity extends MockEntityBase<GetCustomResourceItemById> {
    constructor(client: MockSDK, entopts: any);
    make(this: GetCustomResourceItemByIdEntity): GetCustomResourceItemByIdEntity;
    load(this: any, reqmatch?: GetCustomResourceItemByIdLoadMatch, ctrl?: Control): Promise<GetCustomResourceItemByIdEntity>;
}
export { GetCustomResourceItemByIdEntity };
