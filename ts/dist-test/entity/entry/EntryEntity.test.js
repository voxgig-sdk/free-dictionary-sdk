"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('EntryEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when FREE_DICTIONARY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('FREE_DICTIONARY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.FreeDictionarySDK.test();
        const ent = testsdk.Entry();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.FREE_DICTIONARY_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'entry.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "meanings": { "a": true, "h": "Meanings", "n": "meanings", "r": false, "sh": "Array of meanings for different parts of speech", "t": "`$ARRAY`", "key$": "meanings", "index$": 0 }, "origin": { "a": true, "h": "Origin", "n": "origin", "r": false, "sh": "Etymology and origin of the word", "t": "`$STRING`", "key$": "origin", "index$": 1 }, "phonetic": { "a": true, "h": "Phonetic", "n": "phonetic", "r": false, "sh": "Phonetic transcription of the word", "t": "`$STRING`", "key$": "phonetic", "index$": 2 }, "phonetics": { "a": true, "h": "Phonetics", "n": "phonetics", "r": false, "sh": "Array of phonetic representations", "t": "`$ARRAY`", "key$": "phonetics", "index$": 3 }, "word": { "a": true, "h": "Word", "n": "word", "r": false, "sh": "The word being defined", "t": "`$STRING`", "key$": "word", "index$": 4 } }, "name": "entry", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /entries/{language}/{word}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "en", "k": "param", "n": "language", "or": "language", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "hello", "k": "param", "n": "word", "or": "word", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/entries/{language}/{word}", "q": { "exist": ["language", "word"] }, "r": {}, "s": [{ "lit": "entries" }, { "var": "language" }, { "var": "word" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "entry", "name__orig": "entry", "Name": "Entry", "name_": "entry", "name-": "entry", "NAME": "ENTRY", "index$": 0 }, { "active": true, "entity": "entry", "key$": "BasicEntryFlow", "kind": "basic", "name": "BasicEntryFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "language": "language01", "word": "word01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "entry_ref01" } }], "index$": 0 }] }, 'Entry', { "GET /entries/{language}/{word}": { "protocol": "http", "operationId": "getWordDefinition", "responses": { "200": { "description": "Successful response with word definitions", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "word": { "type": "string", "description": "The word being defined", "key$": "word" }, "phonetic": { "type": "string", "description": "Phonetic transcription of the word", "key$": "phonetic" }, "phonetics": { "type": "array", "description": "Array of phonetic representations", "items": { "type": "object", "properties": { "text": { "type": "string", "description": "Phonetic text representation" }, "audio": { "type": "string", "description": "URL to audio pronunciation file" } }, "x-ref": "#/components/schemas/Phonetic" }, "key$": "phonetics" }, "origin": { "type": "string", "description": "Etymology and origin of the word", "key$": "origin" }, "meanings": { "type": "array", "description": "Array of meanings for different parts of speech", "items": { "type": "object", "properties": { "partOfSpeech": { "type": "string", "description": "Part of speech (e.g., noun, verb, adjective)" }, "definitions": { "type": "array", "description": "Array of definitions for this part of speech", "items": { "type": "object", "properties": { "definition": { "type": "string", "description": "The definition of the word" }, "example": { "type": "string", "description": "Example usage of the word" }, "synonyms": { "type": "array", "description": "List of synonyms", "items": { "type": "string" } }, "antonyms": { "type": "array", "description": "List of antonyms", "items": { "type": "string" } } }, "x-ref": "#/components/schemas/Definition" } } }, "x-ref": "#/components/schemas/Meaning" }, "key$": "meanings" } }, "x-ref": "#/components/schemas/WordEntry", "index$": 0 } }, "example": [{ "word": "hello", "phonetic": "həˈləʊ", "phonetics": [{ "text": "həˈləʊ", "audio": "//ssl.gstatic.com/dictionary/static/sounds/20200429/hello--_gb_1.mp3" }, { "text": "hɛˈləʊ" }], "origin": "early 19th century: variant of earlier hollo ; related to holla.", "meanings": [{ "partOfSpeech": "exclamation", "definitions": [{ "definition": "used as a greeting or to begin a phone conversation.", "example": "hello there, Katie!", "synonyms": [], "antonyms": [] }] }, { "partOfSpeech": "noun", "definitions": [{ "definition": "an utterance of 'hello'; a greeting.", "example": "she was getting polite nods and hellos from people", "synonyms": [], "antonyms": [] }] }, { "partOfSpeech": "verb", "definitions": [{ "definition": "say or shout 'hello'.", "example": "I pressed the phone button and helloed", "synonyms": [], "antonyms": [] }] }] }] } } }, "404": { "description": "Word not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "title": { "type": "string", "description": "Error title" }, "message": { "type": "string", "description": "Error message" }, "resolution": { "type": "string", "description": "Suggested resolution" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "language", "in": "path", "description": "Language code (e.g., 'en' for English)", "required": true, "schema": { "type": "string", "example": "en" }, "index$": 0 }, { "name": "word", "in": "path", "description": "The word to look up", "required": true, "schema": { "type": "string", "example": "hello" }, "index$": 1 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let entry_ref01_data = Object.values(setup.data.existing.entry)[0];
        // LIST
        const entry_ref01_ent = client.Entry();
        const entry_ref01_match = {};
        entry_ref01_match['language'] = setup.idmap['language01'];
        entry_ref01_match['word'] = setup.idmap['word01'];
        const entry_ref01_list = (await entry_ref01_ent.list(entry_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/entry/EntryTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.FreeDictionarySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['entry01', 'entry02', 'entry03', 'language01', 'word01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'FREE_DICTIONARY_TEST_ENTRY_ENTID': idmap,
        'FREE_DICTIONARY_TEST_LIVE': 'FALSE',
        'FREE_DICTIONARY_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['FREE_DICTIONARY_TEST_ENTRY_ENTID'];
    const live = 'TRUE' === env.FREE_DICTIONARY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['FREE_DICTIONARY_TEST_ENTRY_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.FreeDictionarySDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=EntryEntity.test.js.map