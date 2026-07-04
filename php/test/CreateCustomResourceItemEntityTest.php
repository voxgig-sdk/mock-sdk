<?php
declare(strict_types=1);

// CreateCustomResourceItem entity test

require_once __DIR__ . '/../mock_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class CreateCustomResourceItemEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = MockSDK::test(null, null);
        $ent = $testsdk->CreateCustomResourceItem(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = create_custom_resource_item_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "create_custom_resource_item." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set MOCK_TEST_CREATE_CUSTOM_RESOURCE_ITEM_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $create_custom_resource_item_ref01_ent = $client->CreateCustomResourceItem(null);
        $create_custom_resource_item_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.create_custom_resource_item"), "create_custom_resource_item_ref01"));
        $create_custom_resource_item_ref01_data["resource"] = $setup["idmap"]["resource01"];

        $create_custom_resource_item_ref01_data_result = $create_custom_resource_item_ref01_ent->create($create_custom_resource_item_ref01_data, null);
        $create_custom_resource_item_ref01_data = Helpers::to_map($create_custom_resource_item_ref01_data_result);
        $this->assertNotNull($create_custom_resource_item_ref01_data);

    }
}

function create_custom_resource_item_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/create_custom_resource_item/CreateCustomResourceItemTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = MockSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["create_custom_resource_item01", "create_custom_resource_item02", "create_custom_resource_item03", "resource01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("MOCK_TEST_CREATE_CUSTOM_RESOURCE_ITEM_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "MOCK_TEST_CREATE_CUSTOM_RESOURCE_ITEM_ENTID" => $idmap,
        "MOCK_TEST_LIVE" => "FALSE",
        "MOCK_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["MOCK_TEST_CREATE_CUSTOM_RESOURCE_ITEM_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
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
