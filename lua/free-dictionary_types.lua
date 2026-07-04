-- Typed models for the FreeDictionary SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Entry
---@field meaning? table
---@field origin? string
---@field phonetic? string
---@field word? string

---@class EntryListMatch
---@field language string
---@field word string

local M = {}

return M
