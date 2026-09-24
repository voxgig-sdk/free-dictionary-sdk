
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { FreeDictionarySDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = FreeDictionarySDK.test()
    equal(testsdk instanceof FreeDictionarySDK, true,
      'FreeDictionarySDK.test() must return a client synchronously')
  })

})
