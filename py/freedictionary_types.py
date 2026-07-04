# Typed models for the FreeDictionary SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Entry:
    meaning: Optional[list] = None
    origin: Optional[str] = None
    phonetic: Optional[str] = None
    word: Optional[str] = None


@dataclass
class EntryListMatch:
    language: str
    word: str

