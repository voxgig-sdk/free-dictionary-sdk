import { FreeDictionaryEntityBase } from '../FreeDictionaryEntityBase';
import type { FreeDictionarySDK } from '../FreeDictionarySDK';
import type { Control } from '../types';
import type { Entry, EntryListMatch } from '../FreeDictionaryTypes';
declare class EntryEntity extends FreeDictionaryEntityBase<Entry> {
    constructor(client: FreeDictionarySDK, entopts: any);
    make(this: EntryEntity): EntryEntity;
    list(this: any, reqmatch?: EntryListMatch, ctrl?: Control): Promise<EntryEntity[]>;
}
export { EntryEntity };
