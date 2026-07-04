# CreateCustomResourceItem entity test

require "minitest/autorun"
require "json"
require_relative "../Mock_sdk"
require_relative "runner"

class CreateCustomResourceItemEntityTest < Minitest::Test
  def test_create_instance
    testsdk = MockSDK.test(nil, nil)
    ent = testsdk.CreateCustomResourceItem(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = create_custom_resource_item_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "create_custom_resource_item." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set MOCK_TEST_CREATE_CUSTOM_RESOURCE_ITEM_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    create_custom_resource_item_ref01_ent = client.CreateCustomResourceItem(nil)
    create_custom_resource_item_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.create_custom_resource_item"), "create_custom_resource_item_ref01"))
    create_custom_resource_item_ref01_data["resource"] = setup[:idmap]["resource01"]

    create_custom_resource_item_ref01_data_result = create_custom_resource_item_ref01_ent.create(create_custom_resource_item_ref01_data, nil)
    create_custom_resource_item_ref01_data = Helpers.to_map(create_custom_resource_item_ref01_data_result)
    assert !create_custom_resource_item_ref01_data.nil?

  end
end

def create_custom_resource_item_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "create_custom_resource_item", "CreateCustomResourceItemTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = MockSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["create_custom_resource_item01", "create_custom_resource_item02", "create_custom_resource_item03", "resource01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["MOCK_TEST_CREATE_CUSTOM_RESOURCE_ITEM_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "MOCK_TEST_CREATE_CUSTOM_RESOURCE_ITEM_ENTID" => idmap,
    "MOCK_TEST_LIVE" => "FALSE",
    "MOCK_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["MOCK_TEST_CREATE_CUSTOM_RESOURCE_ITEM_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["MOCK_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = MockSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["MOCK_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["MOCK_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
