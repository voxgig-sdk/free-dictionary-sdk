package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/free-dictionary-sdk/go"
	"github.com/voxgig-sdk/free-dictionary-sdk/go/core"

	vs "github.com/voxgig-sdk/free-dictionary-sdk/go/utility/struct"
)

func TestEntryEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Entry(nil)
		if ent == nil {
			t.Fatal("expected non-nil EntryEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := entryBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "entry." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set FREEDICTIONARY_TEST_ENTRY_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		entryRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.entry", setup.data)))
		var entryRef01Data map[string]any
		if len(entryRef01DataRaw) > 0 {
			entryRef01Data = core.ToMapAny(entryRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = entryRef01Data

		// LIST
		entryRef01Ent := client.Entry(nil)
		entryRef01Match := map[string]any{
			"language": setup.idmap["language01"],
			"word": setup.idmap["word01"],
		}

		entryRef01ListResult, err := entryRef01Ent.List(entryRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, entryRef01ListOk := entryRef01ListResult.([]any)
		if !entryRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", entryRef01ListResult)
		}

	})
}

func entryBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "entry", "EntryTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read entry test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse entry test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"entry01", "entry02", "entry03", "language01", "word01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("FREEDICTIONARY_TEST_ENTRY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"FREEDICTIONARY_TEST_ENTRY_ENTID": idmap,
		"FREEDICTIONARY_TEST_LIVE":      "FALSE",
		"FREEDICTIONARY_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["FREEDICTIONARY_TEST_ENTRY_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["FREEDICTIONARY_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewFreeDictionarySDK(core.ToMapAny(mergedOpts))
	}

	live := env["FREEDICTIONARY_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["FREEDICTIONARY_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
