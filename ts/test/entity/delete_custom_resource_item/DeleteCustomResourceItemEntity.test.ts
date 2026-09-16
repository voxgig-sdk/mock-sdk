

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


describe('DeleteCustomResourceItemEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MOCK_TEST_LIVE=TRUE.
  afterEach(liveDelay('MOCK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MockSDK.test()
    const ent = testsdk.DeleteCustomResourceItem()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MOCK_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'delete_custom_resource_item.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":0}],"id":{"field":"id","name":"id","parts":["resource","id"],"sep":"/"},"name":"delete_custom_resource_item","op":{"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"resource","orig":"resource","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"DELETE /{resource}/{id}","json":"{\"operationId\":\"deleteCustomResourceItem\",\"parameters\":[{\"description\":\"Name of the custom resource\",\"in\":\"path\",\"name\":\"resource\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"ID of the item\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"Item deleted successfully\"},\"204\":{\"description\":\"Item deleted successfully (no content)\"},\"404\":{\"description\":\"Item not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/{resource}/{id}","segments":[{"var":"resource"},{"var":"id"}],"select":{"exist":["id","resource"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"delete_custom_resource_item","name__orig":"delete_custom_resource_item","Name":"DeleteCustomResourceItem","name_":"delete_custom_resource_item","name-":"delete-custom-resource-item","NAME":"DELETE_CUSTOM_RESOURCE_ITEM","index$":3}, {"active":true,"entity":"delete_custom_resource_item","key$":"BasicDeleteCustomResourceItemFlow","kind":"basic","name":"BasicDeleteCustomResourceItemFlow","param":{},"step":[]}, 'DeleteCustomResourceItem')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let delete_custom_resource_item_ref01_data = Object.values(setup.data.existing.delete_custom_resource_item)[0] as any

  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/delete_custom_resource_item/DeleteCustomResourceItemTestData.json')

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
    ['delete_custom_resource_item01','delete_custom_resource_item02','delete_custom_resource_item03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MOCK_TEST_DELETE_CUSTOM_RESOURCE_ITEM_ENTID': idmap,
    'MOCK_TEST_LIVE': 'FALSE',
    'MOCK_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['MOCK_TEST_DELETE_CUSTOM_RESOURCE_ITEM_ENTID']

  const live = 'TRUE' === env.MOCK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MOCK_TEST_DELETE_CUSTOM_RESOURCE_ITEM_ENTID']
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
  
