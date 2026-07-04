package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/mock-sdk/go"
	"github.com/voxgig-sdk/mock-sdk/go/core"

	vs "github.com/voxgig-sdk/mock-sdk/go/utility/struct"
)

func TestGetCustomResourceEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.GetCustomResource(nil)
		if ent == nil {
			t.Fatal("expected non-nil GetCustomResourceEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := get_custom_resourceBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "get_custom_resource." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set MOCK_TEST_GET_CUSTOM_RESOURCE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		getCustomResourceRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.get_custom_resource", setup.data)))
		var getCustomResourceRef01Data map[string]any
		if len(getCustomResourceRef01DataRaw) > 0 {
			getCustomResourceRef01Data = core.ToMapAny(getCustomResourceRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = getCustomResourceRef01Data

		// LIST
		getCustomResourceRef01Ent := client.GetCustomResource(nil)
		getCustomResourceRef01Match := map[string]any{
			"resource": setup.idmap["resource01"],
		}

		getCustomResourceRef01ListResult, err := getCustomResourceRef01Ent.List(getCustomResourceRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, getCustomResourceRef01ListOk := getCustomResourceRef01ListResult.([]any)
		if !getCustomResourceRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", getCustomResourceRef01ListResult)
		}

	})
}

func get_custom_resourceBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "get_custom_resource", "GetCustomResourceTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read get_custom_resource test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse get_custom_resource test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"get_custom_resource01", "get_custom_resource02", "get_custom_resource03", "resource01"},
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
	entidEnvRaw := os.Getenv("MOCK_TEST_GET_CUSTOM_RESOURCE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"MOCK_TEST_GET_CUSTOM_RESOURCE_ENTID": idmap,
		"MOCK_TEST_LIVE":      "FALSE",
		"MOCK_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["MOCK_TEST_GET_CUSTOM_RESOURCE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["MOCK_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewMockSDK(core.ToMapAny(mergedOpts))
	}

	live := env["MOCK_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["MOCK_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
