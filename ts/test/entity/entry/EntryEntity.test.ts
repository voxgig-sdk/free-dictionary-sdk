

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { FreeDictionarySDK, BaseFeature, stdutil } from '../../..'

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FREE_DICTIONARY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'entry.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"meanings","req":false,"short":"Array of meanings for different parts of speech","type":"`$ARRAY`","index$":0},{"active":true,"name":"origin","req":false,"short":"Etymology and origin of the word","type":"`$STRING`","index$":1},{"active":true,"name":"phonetic","req":false,"short":"Phonetic transcription of the word","type":"`$STRING`","index$":2},{"active":true,"name":"phonetics","req":false,"short":"Array of phonetic representations","type":"`$ARRAY`","index$":3},{"active":true,"name":"word","req":false,"short":"The word being defined","type":"`$STRING`","index$":4}],"name":"entry","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"example":"en","kind":"param","name":"language","orig":"language","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"example":"hello","kind":"param","name":"word","orig":"word","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /entries/{language}/{word}","json":"{\"operationId\":\"getWordDefinition\",\"parameters\":[{\"description\":\"Language code (e.g., 'en' for English)\",\"in\":\"path\",\"name\":\"language\",\"required\":true,\"schema\":{\"example\":\"en\",\"type\":\"string\"}},{\"description\":\"The word to look up\",\"in\":\"path\",\"name\":\"word\",\"required\":true,\"schema\":{\"example\":\"hello\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":[{\"meanings\":[{\"definitions\":[{\"antonyms\":[],\"definition\":\"used as a greeting or to begin a phone conversation.\",\"example\":\"hello there, Katie!\",\"synonyms\":[]}],\"partOfSpeech\":\"exclamation\"},{\"definitions\":[{\"antonyms\":[],\"definition\":\"an utterance of 'hello'; a greeting.\",\"example\":\"she was getting polite nods and hellos from people\",\"synonyms\":[]}],\"partOfSpeech\":\"noun\"},{\"definitions\":[{\"antonyms\":[],\"definition\":\"say or shout 'hello'.\",\"example\":\"I pressed the phone button and helloed\",\"synonyms\":[]}],\"partOfSpeech\":\"verb\"}],\"origin\":\"early 19th century: variant of earlier hollo ; related to holla.\",\"phonetic\":\"həˈləʊ\",\"phonetics\":[{\"audio\":\"//ssl.gstatic.com/dictionary/static/sounds/20200429/hello--_gb_1.mp3\",\"text\":\"həˈləʊ\"},{\"text\":\"hɛˈləʊ\"}],\"word\":\"hello\"}],\"schema\":{\"items\":{\"properties\":{\"meanings\":{\"description\":\"Array of meanings for different parts of speech\",\"items\":{\"properties\":{\"definitions\":{\"description\":\"Array of definitions for this part of speech\",\"items\":{\"properties\":{\"antonyms\":{\"description\":\"List of antonyms\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"definition\":{\"description\":\"The definition of the word\",\"type\":\"string\"},\"example\":{\"description\":\"Example usage of the word\",\"type\":\"string\"},\"synonyms\":{\"description\":\"List of synonyms\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"},\"partOfSpeech\":{\"description\":\"Part of speech (e.g., noun, verb, adjective)\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"origin\":{\"description\":\"Etymology and origin of the word\",\"type\":\"string\"},\"phonetic\":{\"description\":\"Phonetic transcription of the word\",\"type\":\"string\"},\"phonetics\":{\"description\":\"Array of phonetic representations\",\"items\":{\"properties\":{\"audio\":{\"description\":\"URL to audio pronunciation file\",\"type\":\"string\"},\"text\":{\"description\":\"Phonetic text representation\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"word\":{\"description\":\"The word being defined\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with word definitions\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"description\":\"Error message\",\"type\":\"string\"},\"resolution\":{\"description\":\"Suggested resolution\",\"type\":\"string\"},\"title\":{\"description\":\"Error title\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Word not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/entries/{language}/{word}","segments":[{"lit":"entries"},{"var":"language"},{"var":"word"}],"select":{"exist":["language","word"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["entry"]]},"key$":"entry","name__orig":"entry","Name":"Entry","name_":"entry","name-":"entry","NAME":"ENTRY","index$":0}, {"active":true,"entity":"entry","key$":"BasicEntryFlow","kind":"basic","name":"BasicEntryFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{"language":"language01","word":"word01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"entry_ref01"}}],"index$":0}]}, 'Entry')
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
    ['entry01','entry02','entry03','entry01','entry02','entry03'],
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
  
