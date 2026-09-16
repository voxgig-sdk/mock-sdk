

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { MockSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('GetCustomResourceItemByIdEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MOCK_TEST_LIVE=TRUE.
  afterEach(liveDelay('MOCK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MockSDK.test()
    const ent = testsdk.GetCustomResourceItemById()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MOCK_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'get_custom_resource_item_by_id.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":0}],"id":{"field":"id","name":"id","parts":["resource","id"],"sep":"/"},"name":"get_custom_resource_item_by_id","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"resource","orig":"resource","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /{resource}/{id}","json":"{\"operationId\":\"getCustomResourceItemById\",\"parameters\":[{\"description\":\"Name of the custom resource\",\"in\":\"path\",\"name\":\"resource\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"ID of the item\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"type\":\"object\"}}},\"description\":\"Successful response with item details\"},\"404\":{\"description\":\"Item not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/{resource}/{id}","segments":[{"var":"resource"},{"var":"id"}],"select":{"exist":["id","resource"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"get_custom_resource_item_by_id","name__orig":"get_custom_resource_item_by_id","Name":"GetCustomResourceItemById","name_":"get_custom_resource_item_by_id","name-":"get-custom-resource-item-by-id","NAME":"GET_CUSTOM_RESOURCE_ITEM_BY_ID","index$":5}, {"active":true,"entity":"get_custom_resource_item_by_id","key$":"BasicGetCustomResourceItemByIdFlow","kind":"basic","name":"BasicGetCustomResourceItemByIdFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"get_custom_resource_item_by_id_ref01","srcdatavar":"get_custom_resource_item_by_id_ref01_data","suffix":"_dt0"},"match":{"id":"get_custom_resource_item_by_id01","resource":"resource01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-get_custom_resource_item_by_id_ref01"}}],"index$":0}]}, 'GetCustomResourceItemById')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_custom_resource_item_by_id_ref01_data = Object.values(setup.data.existing.get_custom_resource_item_by_id)[0] as any

    // LOAD
    const get_custom_resource_item_by_id_ref01_ent = client.GetCustomResourceItemById()
    const get_custom_resource_item_by_id_ref01_match_dt0: any = {}
    get_custom_resource_item_by_id_ref01_match_dt0.id = get_custom_resource_item_by_id_ref01_data.id
    const get_custom_resource_item_by_id_ref01_data_dt0 = (await get_custom_resource_item_by_id_ref01_ent.load(get_custom_resource_item_by_id_ref01_match_dt0)).data()
    assert(get_custom_resource_item_by_id_ref01_data_dt0.id === get_custom_resource_item_by_id_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/get_custom_resource_item_by_id/GetCustomResourceItemByIdTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = MockSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['get_custom_resource_item_by_id01','get_custom_resource_item_by_id02','get_custom_resource_item_by_id03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MOCK_TEST_GET_CUSTOM_RESOURCE_ITEM_BY_ID_ENTID': idmap,
    'MOCK_TEST_LIVE': 'FALSE',
    'MOCK_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['MOCK_TEST_GET_CUSTOM_RESOURCE_ITEM_BY_ID_ENTID']

  const live = 'TRUE' === env.MOCK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MOCK_TEST_GET_CUSTOM_RESOURCE_ITEM_BY_ID_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new MockSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
