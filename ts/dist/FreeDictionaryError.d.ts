import { Context } from './Context';
declare class FreeDictionaryError extends Error {
    isFreeDictionaryError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { FreeDictionaryError };
