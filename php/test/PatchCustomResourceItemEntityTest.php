<?php
declare(strict_types=1);

// PatchCustomResourceItem entity test

require_once __DIR__ . '/../mock_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PatchCustomResourceItemEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = MockSDK::test(null, null);
        $ent = $testsdk->PatchCustomResourceItem(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = patch_custom_resource_item_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["update"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "patch_custom_resource_item." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set MOCK_TEST_PATCH_CUSTOM_RESOURCE_ITEM_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $patch_custom_resource_item_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.patch_custom_resource_item")));
        $patch_custom_resource_item_ref01_data = null;
        if (count($patch_custom_resource_item_ref01_data_raw) > 0) {
            $patch_custom_resource_item_ref01_data = Helpers::to_map($patch_custom_resource_item_ref01_data_raw[0][1]);
        }

        // UPDATE
        $patch_custom_resource_item_ref01_ent = $client->PatchCustomResourceItem(null);
        $patch_custom_resource_item_ref01_data_up0_up = [
            "resource" => $setup["idmap"]["resource"],
        ];

        $patch_custom_resource_item_ref01_resdata_up0_result = $patch_custom_resource_item_ref01_ent->update($patch_custom_resource_item_ref01_data_up0_up, null);
        $patch_custom_resource_item_ref01_resdata_up0 = Helpers::to_map($patch_custom_resource_item_ref01_resdata_up0_result);
        $this->assertNotNull($patch_custom_resource_item_ref01_resdata_up0);

    }
}

function patch_custom_resource_item_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/patch_custom_resource_item/PatchCustomResourceItemTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = MockSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["patch_custom_resource_item01", "patch_custom_resource_item02", "patch_custom_resource_item03", "resource01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("MOCK_TEST_PATCH_CUSTOM_RESOURCE_ITEM_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "MOCK_TEST_PATCH_CUSTOM_RESOURCE_ITEM_ENTID" => $idmap,
        "MOCK_TEST_LIVE" => "FALSE",
        "MOCK_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["MOCK_TEST_PATCH_CUSTOM_RESOURCE_ITEM_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }
    if (!isset($idmap_resolved["resource"])) {
        $idmap_resolved["resource"] = $idmap_resolved["resource01"];
    }

    if ($env["MOCK_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new MockSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["MOCK_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["MOCK_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
