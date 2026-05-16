
import { Context } from './Context'


class MockError extends Error {

  isMockError = true

  sdk = 'Mock'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  MockError
}

