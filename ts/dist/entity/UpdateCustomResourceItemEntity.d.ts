import { MockEntityBase } from '../MockEntityBase';
import type { MockSDK } from '../MockSDK';
import type { Control } from '../types';
import type { UpdateCustomResourceItem, UpdateCustomResourceItemUpdateData } from '../MockTypes';
declare class UpdateCustomResourceItemEntity extends MockEntityBase<UpdateCustomResourceItem> {
    constructor(client: MockSDK, entopts: any);
    make(this: UpdateCustomResourceItemEntity): UpdateCustomResourceItemEntity;
    update(this: any, reqdata?: UpdateCustomResourceItemUpdateData, ctrl?: Control): Promise<UpdateCustomResourceItemEntity>;
}
export { UpdateCustomResourceItemEntity };
