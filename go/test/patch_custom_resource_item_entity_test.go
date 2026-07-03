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

func TestPatchCustomResourceItemEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.PatchCustomResourceItem(nil)
		if ent == nil {
			t.Fatal("expected non-nil PatchCustomResourceItemEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := patch_custom_resource_itemBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"update"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "patch_custom_resource_item." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set MOCK_TEST_PATCH_CUSTOM_RESOURCE_ITEM_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		patchCustomResourceItemRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.patch_custom_resource_item", setup.data)))
		var patchCustomResourceItemRef01Data map[string]any
		if len(patchCustomResourceItemRef01DataRaw) > 0 {
			patchCustomResourceItemRef01Data = core.ToMapAny(patchCustomResourceItemRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = patchCustomResourceItemRef01Data

		// UPDATE
		patchCustomResourceItemRef01Ent := client.PatchCustomResourceItem(nil)
		patchCustomResourceItemRef01DataUp0Up := map[string]any{
			"resource": setup.idmap["resource"],
		}

		patchCustomResourceItemRef01ResdataUp0Result, err := patchCustomResourceItemRef01Ent.Update(patchCustomResourceItemRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		patchCustomResourceItemRef01ResdataUp0 := core.ToMapAny(patchCustomResourceItemRef01ResdataUp0Result)
		if patchCustomResourceItemRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}

	})
}

func patch_custom_resource_itemBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "patch_custom_resource_item", "PatchCustomResourceItemTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read patch_custom_resource_item test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse patch_custom_resource_item test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"patch_custom_resource_item01", "patch_custom_resource_item02", "patch_custom_resource_item03", "resource01"},
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
	entidEnvRaw := os.Getenv("MOCK_TEST_PATCH_CUSTOM_RESOURCE_ITEM_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"MOCK_TEST_PATCH_CUSTOM_RESOURCE_ITEM_ENTID": idmap,
		"MOCK_TEST_LIVE":      "FALSE",
		"MOCK_TEST_EXPLAIN":   "FALSE",
		"MOCK_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["MOCK_TEST_PATCH_CUSTOM_RESOURCE_ITEM_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add resource alias for update test.
	if idmapResolved["resource"] == nil {
		idmapResolved["resource"] = idmapResolved["resource01"]
	}

	if env["MOCK_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["MOCK_APIKEY"],
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
