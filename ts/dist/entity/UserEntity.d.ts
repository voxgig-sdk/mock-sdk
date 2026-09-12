import { MockEntityBase } from '../MockEntityBase';
import type { MockSDK } from '../MockSDK';
import type { Control } from '../types';
import type { User, UserListMatch } from '../MockTypes';
declare class UserEntity extends MockEntityBase<User> {
    constructor(client: MockSDK, entopts: any);
    make(this: UserEntity): UserEntity;
    list(this: any, reqmatch?: UserListMatch, ctrl?: Control): Promise<UserEntity[]>;
}
export { UserEntity };
