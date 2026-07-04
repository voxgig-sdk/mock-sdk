# UpdateCustomResourceItem entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from mock_sdk import MockSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestUpdateCustomResourceItemEntity:

    def test_should_create_instance(self):
        testsdk = MockSDK.test(None, None)
        ent = testsdk.UpdateCustomResourceItem(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _update_custom_resource_item_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["update"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "update_custom_resource_item." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set MOCK_TEST_UPDATE_CUSTOM_RESOURCE_ITEM_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        update_custom_resource_item_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.update_custom_resource_item")))
        update_custom_resource_item_ref01_data = None
        if len(update_custom_resource_item_ref01_data_raw) > 0:
            update_custom_resource_item_ref01_data = helpers.to_map(update_custom_resource_item_ref01_data_raw[0][1])

        # UPDATE
        update_custom_resource_item_ref01_ent = client.UpdateCustomResourceItem(None)
        update_custom_resource_item_ref01_data_up0_up = {
            "resource": setup["idmap"]["resource"],
        }

        update_custom_resource_item_ref01_resdata_up0 = helpers.to_map(update_custom_resource_item_ref01_ent.update(update_custom_resource_item_ref01_data_up0_up, None))
        assert update_custom_resource_item_ref01_resdata_up0 is not None



def _update_custom_resource_item_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/update_custom_resource_item/UpdateCustomResourceItemTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = MockSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["update_custom_resource_item01", "update_custom_resource_item02", "update_custom_resource_item03", "resource01"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "MOCK_TEST_UPDATE_CUSTOM_RESOURCE_ITEM_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "MOCK_TEST_UPDATE_CUSTOM_RESOURCE_ITEM_ENTID": idmap,
        "MOCK_TEST_LIVE": "FALSE",
        "MOCK_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("MOCK_TEST_UPDATE_CUSTOM_RESOURCE_ITEM_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)
    if idmap_resolved.get("resource") is None:
        idmap_resolved["resource"] = idmap_resolved.get("resource01")

    if env.get("MOCK_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
            },
            extra or {},
        ])
        client = MockSDK(helpers.to_map(merged_opts))

    _live = env.get("MOCK_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("MOCK_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
