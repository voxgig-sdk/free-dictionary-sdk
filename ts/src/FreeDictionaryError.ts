
import { Context } from './Context'


class FreeDictionaryError extends Error {

  isFreeDictionaryError = true

  sdk = 'FreeDictionary'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  FreeDictionaryError
}

