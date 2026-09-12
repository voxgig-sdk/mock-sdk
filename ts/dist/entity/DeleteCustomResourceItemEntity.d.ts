import { MockEntityBase } from '../MockEntityBase';
import type { MockSDK } from '../MockSDK';
import type { Control } from '../types';
import type { DeleteCustomResourceItem, DeleteCustomResourceItemRemoveMatch } from '../MockTypes';
declare class DeleteCustomResourceItemEntity extends MockEntityBase<DeleteCustomResourceItem> {
    constructor(client: MockSDK, entopts: any);
    make(this: DeleteCustomResourceItemEntity): DeleteCustomResourceItemEntity;
    remove(this: any, reqmatch?: DeleteCustomResourceItemRemoveMatch, ctrl?: Control): Promise<DeleteCustomResourceItemEntity>;
}
export { DeleteCustomResourceItemEntity };
