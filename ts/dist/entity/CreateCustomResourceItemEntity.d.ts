import { MockEntityBase } from '../MockEntityBase';
import type { MockSDK } from '../MockSDK';
import type { Control } from '../types';
import type { CreateCustomResourceItem, CreateCustomResourceItemCreateData } from '../MockTypes';
declare class CreateCustomResourceItemEntity extends MockEntityBase<CreateCustomResourceItem> {
    constructor(client: MockSDK, entopts: any);
    make(this: CreateCustomResourceItemEntity): CreateCustomResourceItemEntity;
    create(this: any, reqdata?: CreateCustomResourceItemCreateData, ctrl?: Control): Promise<CreateCustomResourceItemEntity>;
}
export { CreateCustomResourceItemEntity };
