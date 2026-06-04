# FreeDictionary SDK

Look up English word definitions, phonetics, audio pronunciations, and usage examples from a free open-source dictionary

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Free Dictionary API

The Free Dictionary API is a community-run lookup service for English words, maintained by [meetDeveloper](https://dictionaryapi.dev/) and hosted at `api.dictionaryapi.dev`. It is positioned as a building block for games, learning apps, and speech or text projects that need quick access to dictionary content.

What you get from the API:
- Word lookup by exact spelling via `GET /api/v2/entries/en/{word}`
- Phonetic transcriptions and audio pronunciation links
- Meanings grouped by part of speech (noun, verb, exclamation, and so on)
- Individual definitions with example sentences
- Synonyms and antonyms where available, plus origin/etymology when present

The service is CORS-enabled and requires no API key. Rate limits and dictionary source attributions are not formally documented, so production users should keep request volumes reasonable and consult the upstream project for current terms.

## Try it

**TypeScript**
```bash
npm install free-dictionary
```

**Python**
```bash
pip install free-dictionary-sdk
```

**PHP**
```bash
composer require voxgig/free-dictionary-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/free-dictionary-sdk/go
```

**Ruby**
```bash
gem install free-dictionary-sdk
```

**Lua**
```bash
luarocks install free-dictionary-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { FreeDictionarySDK } from 'free-dictionary'

const client = new FreeDictionarySDK({})

// List all entrys
const entrys = await client.Entry().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o free-dictionary-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "free-dictionary": {
      "command": "/abs/path/to/free-dictionary-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Entry** | A dictionary entry for a single English word, retrieved via `GET /api/v2/entries/en/{word}` and containing phonetics, audio links, and meanings grouped by part of speech with definitions, examples, synonyms, and antonyms. | `/entries/{language}/{word}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from freedictionary_sdk import FreeDictionarySDK

client = FreeDictionarySDK({})

# List all entrys
entrys, err = client.Entry(None).list(None, None)
```

### PHP

```php
<?php
require_once 'freedictionary_sdk.php';

$client = new FreeDictionarySDK([]);

// List all entrys
[$entrys, $err] = $client->Entry(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/free-dictionary-sdk/go"

client := sdk.NewFreeDictionarySDK(map[string]any{})

// List all entrys
entrys, err := client.Entry(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "FreeDictionary_sdk"

client = FreeDictionarySDK.new({})

# List all entrys
entrys, err = client.Entry(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("free-dictionary_sdk")

local client = sdk.new({})

-- List all entrys
local entrys, err = client:Entry(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = FreeDictionarySDK.test()
const result = await client.Entry().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = FreeDictionarySDK.test(None, None)
result, err = client.Entry(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = FreeDictionarySDK::test(null, null);
[$result, $err] = $client->Entry(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Entry(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = FreeDictionarySDK.test(nil, nil)
result, err = client.Entry(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Entry(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Free Dictionary API

- Upstream: [https://dictionaryapi.dev/](https://dictionaryapi.dev/)

- The service is described as permanently free with no usage cost
- Maintained as an open-source project by meetDeveloper, with hosting funded via donations
- No attribution or rate-limit terms are published on the docs page; check the project repository for the current licence before redistributing data

---

Generated from the Free Dictionary API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
