
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { FreeDictionarySDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await FreeDictionarySDK.test()
    equal(null !== testsdk, true)
  })

})
