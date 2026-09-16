"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('GetCustomResourceItemByIdEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MOCK_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MOCK_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.MockSDK.test();
        const ent = testsdk.GetCustomResourceItemById();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MOCK_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'get_custom_resource_item_by_id.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 0 }], "id": { "field": "id", "name": "id", "parts": ["resource", "id"], "sep": "/" }, "name": "get_custom_resource_item_by_id", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "param", "name": "resource", "orig": "resource", "reqd": true, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /{resource}/{id}", "json": "{\"operationId\":\"getCustomResourceItemById\",\"parameters\":[{\"description\":\"Name of the custom resource\",\"in\":\"path\",\"name\":\"resource\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"ID of the item\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"type\":\"object\"}}},\"description\":\"Successful response with item details\"},\"404\":{\"description\":\"Item not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/{resource}/{id}", "segments": [{ "var": "resource" }, { "var": "id" }], "select": { "exist": ["id", "resource"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "get_custom_resource_item_by_id", "name__orig": "get_custom_resource_item_by_id", "Name": "GetCustomResourceItemById", "name_": "get_custom_resource_item_by_id", "name-": "get-custom-resource-item-by-id", "NAME": "GET_CUSTOM_RESOURCE_ITEM_BY_ID", "index$": 5 }, { "active": true, "entity": "get_custom_resource_item_by_id", "key$": "BasicGetCustomResourceItemByIdFlow", "kind": "basic", "name": "BasicGetCustomResourceItemByIdFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "get_custom_resource_item_by_id_ref01", "srcdatavar": "get_custom_resource_item_by_id_ref01_data", "suffix": "_dt0" }, "match": { "id": "get_custom_resource_item_by_id01", "resource": "resource01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-get_custom_resource_item_by_id_ref01" } }], "index$": 0 }] }, 'GetCustomResourceItemById');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let get_custom_resource_item_by_id_ref01_data = Object.values(setup.data.existing.get_custom_resource_item_by_id)[0];
        // LOAD
        const get_custom_resource_item_by_id_ref01_ent = client.GetCustomResourceItemById();
        const get_custom_resource_item_by_id_ref01_match_dt0 = {};
        get_custom_resource_item_by_id_ref01_match_dt0.id = get_custom_resource_item_by_id_ref01_data.id;
        const get_custom_resource_item_by_id_ref01_data_dt0 = (await get_custom_resource_item_by_id_ref01_ent.load(get_custom_resource_item_by_id_ref01_match_dt0)).data();
        (0, node_assert_1.default)(get_custom_resource_item_by_id_ref01_data_dt0.id === get_custom_resource_item_by_id_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/get_custom_resource_item_by_id/GetCustomResourceItemByIdTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.MockSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['get_custom_resource_item_by_id01', 'get_custom_resource_item_by_id02', 'get_custom_resource_item_by_id03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'MOCK_TEST_GET_CUSTOM_RESOURCE_ITEM_BY_ID_ENTID': idmap,
        'MOCK_TEST_LIVE': 'FALSE',
        'MOCK_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['MOCK_TEST_GET_CUSTOM_RESOURCE_ITEM_BY_ID_ENTID'];
    const live = 'TRUE' === env.MOCK_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['MOCK_TEST_GET_CUSTOM_RESOURCE_ITEM_BY_ID_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.MockSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.MOCK_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=GetCustomResourceItemByIdEntity.test.js.map