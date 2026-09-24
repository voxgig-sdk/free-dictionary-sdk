

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"meanings":{"a":true,"h":"Meanings","n":"meanings","r":false,"sh":"Array of meanings for different parts of speech","t":"`$ARRAY`","key$":"meanings","index$":0},"origin":{"a":true,"h":"Origin","n":"origin","r":false,"sh":"Etymology and origin of the word","t":"`$STRING`","key$":"origin","index$":1},"phonetic":{"a":true,"h":"Phonetic","n":"phonetic","r":false,"sh":"Phonetic transcription of the word","t":"`$STRING`","key$":"phonetic","index$":2},"phonetics":{"a":true,"h":"Phonetics","n":"phonetics","r":false,"sh":"Array of phonetic representations","t":"`$ARRAY`","key$":"phonetics","index$":3},"word":{"a":true,"h":"Word","n":"word","r":false,"sh":"The word being defined","t":"`$STRING`","key$":"word","index$":4}},"name":"entry","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /entries/{language}/{word}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"en","k":"param","n":"language","or":"language","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"hello","k":"param","n":"word","or":"word","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/entries/{language}/{word}","q":{"exist":["language","word"]},"r":{},"s":[{"lit":"entries"},{"var":"language"},{"var":"word"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"entry","name__orig":"entry","Name":"Entry","name_":"entry","name-":"entry","NAME":"ENTRY","index$":0}, {"active":true,"entity":"entry","key$":"BasicEntryFlow","kind":"basic","name":"BasicEntryFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"language":"language01","word":"word01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"entry_ref01"}}],"index$":0}]}, 'Entry', {"GET /entries/{language}/{word}":{"protocol":"http","operationId":"getWordDefinition","responses":{"200":{"description":"Successful response with word definitions","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"word":{"type":"string","description":"The word being defined","key$":"word"},"phonetic":{"type":"string","description":"Phonetic transcription of the word","key$":"phonetic"},"phonetics":{"type":"array","description":"Array of phonetic representations","items":{"type":"object","properties":{"text":{"type":"string","description":"Phonetic text representation"},"audio":{"type":"string","description":"URL to audio pronunciation file"}},"x-ref":"#/components/schemas/Phonetic"},"key$":"phonetics"},"origin":{"type":"string","description":"Etymology and origin of the word","key$":"origin"},"meanings":{"type":"array","description":"Array of meanings for different parts of speech","items":{"type":"object","properties":{"partOfSpeech":{"type":"string","description":"Part of speech (e.g., noun, verb, adjective)"},"definitions":{"type":"array","description":"Array of definitions for this part of speech","items":{"type":"object","properties":{"definition":{"type":"string","description":"The definition of the word"},"example":{"type":"string","description":"Example usage of the word"},"synonyms":{"type":"array","description":"List of synonyms","items":{"type":"string"}},"antonyms":{"type":"array","description":"List of antonyms","items":{"type":"string"}}},"x-ref":"#/components/schemas/Definition"}}},"x-ref":"#/components/schemas/Meaning"},"key$":"meanings"}},"x-ref":"#/components/schemas/WordEntry","index$":0}},"example":[{"word":"hello","phonetic":"həˈləʊ","phonetics":[{"text":"həˈləʊ","audio":"//ssl.gstatic.com/dictionary/static/sounds/20200429/hello--_gb_1.mp3"},{"text":"hɛˈləʊ"}],"origin":"early 19th century: variant of earlier hollo ; related to holla.","meanings":[{"partOfSpeech":"exclamation","definitions":[{"definition":"used as a greeting or to begin a phone conversation.","example":"hello there, Katie!","synonyms":[],"antonyms":[]}]},{"partOfSpeech":"noun","definitions":[{"definition":"an utterance of 'hello'; a greeting.","example":"she was getting polite nods and hellos from people","synonyms":[],"antonyms":[]}]},{"partOfSpeech":"verb","definitions":[{"definition":"say or shout 'hello'.","example":"I pressed the phone button and helloed","synonyms":[],"antonyms":[]}]}]}]}}},"404":{"description":"Word not found","content":{"application/json":{"schema":{"type":"object","properties":{"title":{"type":"string","description":"Error title"},"message":{"type":"string","description":"Error message"},"resolution":{"type":"string","description":"Suggested resolution"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"language","in":"path","description":"Language code (e.g., 'en' for English)","required":true,"schema":{"type":"string","example":"en"},"index$":0},{"name":"word","in":"path","description":"The word to look up","required":true,"schema":{"type":"string","example":"hello"},"index$":1}],"securitySource":"unspecified"}})
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
  
