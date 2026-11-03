

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { FreeDictionarySDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('EntryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FREE_DICTIONARY_TEST_LIVE=TRUE.
  afterEach(liveDelay('FREE_DICTIONARY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FreeDictionarySDK.test()
    const ent = testsdk.Entry()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = FreeDictionarySDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Entry().list({"language":1,"word":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FREE_DICTIONARY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'entry.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"meanings":{"a":true,"h":"Meanings","n":"meanings","r":false,"sh":"Array of meanings for different parts of speech","t":"`$ARRAY`","key$":"meanings","index$":0},"origin":{"a":true,"h":"Origin","n":"origin","r":false,"sh":"Etymology and origin of the word","t":"`$STRING`","key$":"origin","index$":1},"phonetic":{"a":true,"h":"Phonetic","n":"phonetic","r":false,"sh":"Phonetic transcription of the word","t":"`$STRING`","key$":"phonetic","index$":2},"phonetics":{"a":true,"h":"Phonetics","n":"phonetics","r":false,"sh":"Array of phonetic representations","t":"`$ARRAY`","key$":"phonetics","index$":3},"word":{"a":true,"h":"Word","n":"word","r":false,"sh":"The word being defined","t":"`$STRING`","key$":"word","index$":4}},"name":"entry","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /entries/{language}/{word}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"en","k":"param","n":"language","or":"language","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"hello","k":"param","n":"word","or":"word","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/entries/{language}/{word}","q":{"exist":["language","word"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"entries"},{"var":"language"},{"var":"word"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"entry","name__orig":"entry","Name":"Entry","name_":"entry","name-":"entry","NAME":"ENTRY","index$":0}, {"active":true,"entity":"entry","key$":"BasicEntryFlow","kind":"basic","name":"BasicEntryFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"language":"language01","word":"word01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"entry_ref01"}}],"index$":0}]}, 'Entry', {"GET /entries/{language}/{word}":{"protocol":"http","parameters":[{"name":"language","in":"path","description":"Language code (e.g., 'en' for English)","required":true,"schema":{"type":"string","example":"en"},"index$":0},{"name":"word","in":"path","description":"The word to look up","required":true,"schema":{"type":"string","example":"hello"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let entry_ref01_data = Object.values(setup.data.existing.entry)[0] as any

    // LIST
    const entry_ref01_ent = client.Entry()
    const entry_ref01_match: any = {}
    entry_ref01_match['language'] = setup.idmap['language01']
    entry_ref01_match['word'] = setup.idmap['word01']

    const entry_ref01_list = (await entry_ref01_ent.list(entry_ref01_match)).map((e: any) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/entry/EntryTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = FreeDictionarySDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['entry01','entry02','entry03','language01','word01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FREE_DICTIONARY_TEST_ENTRY_ENTID': idmap,
    'FREE_DICTIONARY_TEST_LIVE': 'FALSE',
    'FREE_DICTIONARY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['FREE_DICTIONARY_TEST_ENTRY_ENTID']

  const live = 'TRUE' === env.FREE_DICTIONARY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FREE_DICTIONARY_TEST_ENTRY_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new FreeDictionarySDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.FREE_DICTIONARY_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
