import { MockEntityBase } from '../MockEntityBase';
import type { MockSDK } from '../MockSDK';
import type { Control } from '../types';
import type { Status, StatusLoadMatch } from '../MockTypes';
declare class StatusEntity extends MockEntityBase<Status> {
    constructor(client: MockSDK, entopts: any);
    make(this: StatusEntity): StatusEntity;
    load(this: any, reqmatch?: StatusLoadMatch, ctrl?: Control): Promise<StatusEntity>;
}
export { StatusEntity };
