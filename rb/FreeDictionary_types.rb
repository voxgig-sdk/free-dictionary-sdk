# frozen_string_literal: true

# Typed models for the FreeDictionary SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Entry entity data model.
#
# @!attribute [rw] meaning
#   @return [Array, nil]
#
# @!attribute [rw] origin
#   @return [String, nil]
#
# @!attribute [rw] phonetic
#   @return [String, nil]
#
# @!attribute [rw] word
#   @return [String, nil]
Entry = Struct.new(
  :meaning,
  :origin,
  :phonetic,
  :word,
  keyword_init: true
)

# Request payload for Entry#list.
#
# @!attribute [rw] language
#   @return [String]
#
# @!attribute [rw] word
#   @return [String]
EntryListMatch = Struct.new(
  :language,
  :word,
  keyword_init: true
)

