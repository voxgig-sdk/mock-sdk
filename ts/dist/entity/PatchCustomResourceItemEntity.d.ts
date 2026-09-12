import { MockEntityBase } from '../MockEntityBase';
import type { MockSDK } from '../MockSDK';
import type { Control } from '../types';
import type { PatchCustomResourceItem, PatchCustomResourceItemUpdateData } from '../MockTypes';
declare class PatchCustomResourceItemEntity extends MockEntityBase<PatchCustomResourceItem> {
    constructor(client: MockSDK, entopts: any);
    make(this: PatchCustomResourceItemEntity): PatchCustomResourceItemEntity;
    update(this: any, reqdata?: PatchCustomResourceItemUpdateData, ctrl?: Control): Promise<PatchCustomResourceItemEntity>;
}
export { PatchCustomResourceItemEntity };
