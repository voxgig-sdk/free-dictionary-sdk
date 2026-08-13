// Typed models for the FreeDictionary SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Entry {
  meanings?: any[]
  origin?: string
  phonetic?: string
  phonetics?: any[]
  word?: string
}

export interface EntryListMatch {
  language: string
  word: string
}

