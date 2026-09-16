

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


describe('StatusEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MOCK_TEST_LIVE=TRUE.
  afterEach(liveDelay('MOCK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MockSDK.test()
    const ent = testsdk.Status()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MOCK_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'status.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":0}],"id":{"field":"id","name":"id"},"name":"status","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"code","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /public/status/{code}","json":"{\"operationId\":\"simulateStatusCode\",\"parameters\":[{\"description\":\"HTTP status code to simulate (e.g., 401, 404, 500)\",\"in\":\"path\",\"name\":\"code\",\"required\":true,\"schema\":{\"maximum\":599,\"minimum\":100,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"Response with the requested status code\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"example\":{\"error\":\"demo error\"},\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized error simulation\"},\"404\":{\"description\":\"Not found error simulation\"},\"500\":{\"description\":\"Internal server error simulation\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/public/status/{code}","rename":{"param":{"code":"id"}},"segments":[{"lit":"public"},{"lit":"status"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{},"contract":{"id":"GET /public/status","json":"{\"operationId\":\"getStatusInfo\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"Successful response with status information\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/public/status","segments":[{"lit":"public"},{"lit":"status"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"status","name__orig":"status","Name":"Status","name_":"status","name-":"status","NAME":"STATUS","index$":8}, {"active":true,"entity":"status","key$":"BasicStatusFlow","kind":"basic","name":"BasicStatusFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"status_ref01","srcdatavar":"status_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-status_ref01"}}],"index$":0}]}, 'Status')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let status_ref01_data = Object.values(setup.data.existing.status)[0] as any

    // LOAD
    const status_ref01_ent = client.Status()
    const status_ref01_match_dt0: any = {}
    status_ref01_match_dt0.id = status_ref01_data.id
    const status_ref01_data_dt0 = (await status_ref01_ent.load(status_ref01_match_dt0)).data()
    assert(status_ref01_data_dt0.id === status_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/status/StatusTestData.json')

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
    ['status01','status02','status03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MOCK_TEST_STATUS_ENTID': idmap,
    'MOCK_TEST_LIVE': 'FALSE',
    'MOCK_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['MOCK_TEST_STATUS_ENTID']

  const live = 'TRUE' === env.MOCK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MOCK_TEST_STATUS_ENTID']
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
  
