<?php
declare(strict_types=1);

// GetCustomResource entity test

require_once __DIR__ . '/../mock_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class GetCustomResourceEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = MockSDK::test(null, null);
        $ent = $testsdk->GetCustomResource(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = get_custom_resource_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "get_custom_resource." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set MOCK_TEST_GET_CUSTOM_RESOURCE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $get_custom_resource_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.get_custom_resource")));
        $get_custom_resource_ref01_data = null;
        if (count($get_custom_resource_ref01_data_raw) > 0) {
            $get_custom_resource_ref01_data = Helpers::to_map($get_custom_resource_ref01_data_raw[0][1]);
        }

        // LIST
        $get_custom_resource_ref01_ent = $client->GetCustomResource(null);
        $get_custom_resource_ref01_match = [
            "resource" => $setup["idmap"]["resource01"],
        ];

        [$get_custom_resource_ref01_list_result, $err] = $get_custom_resource_ref01_ent->list($get_custom_resource_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($get_custom_resource_ref01_list_result);

    }
}

function get_custom_resource_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/get_custom_resource/GetCustomResourceTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = MockSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["get_custom_resource01", "get_custom_resource02", "get_custom_resource03", "resource01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("MOCK_TEST_GET_CUSTOM_RESOURCE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "MOCK_TEST_GET_CUSTOM_RESOURCE_ENTID" => $idmap,
        "MOCK_TEST_LIVE" => "FALSE",
        "MOCK_TEST_EXPLAIN" => "FALSE",
        "MOCK_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["MOCK_TEST_GET_CUSTOM_RESOURCE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["MOCK_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["MOCK_APIKEY"],
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
