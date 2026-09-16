

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


describe('CouponEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MOCK_TEST_LIVE=TRUE.
  afterEach(liveDelay('MOCK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MockSDK.test()
    const ent = testsdk.Coupon()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MOCK_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'coupon.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"code","req":false,"short":"Coupon code","type":"`$STRING`","index$":0},{"active":true,"name":"discount","req":false,"short":"Discount amount or percentage","type":"`$NUMBER`","index$":1},{"active":true,"name":"id","req":false,"short":"Coupon ID","type":"`$STRING`","index$":2}],"id":{"field":"id","name":"id"},"name":"coupon","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /public/coupons","json":"{\"operationId\":\"getPublicCoupons\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"code\":{\"description\":\"Coupon code\",\"type\":\"string\"},\"discount\":{\"description\":\"Discount amount or percentage\",\"type\":\"number\"},\"id\":{\"description\":\"Coupon ID\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with list of coupons\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/public/coupons","segments":[{"lit":"public"},{"lit":"coupons"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"coupon","name__orig":"coupon","Name":"Coupon","name_":"coupon","name-":"coupon","NAME":"COUPON","index$":1}, {"active":true,"entity":"coupon","key$":"BasicCouponFlow","kind":"basic","name":"BasicCouponFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"coupon_ref01"}}],"index$":0}]}, 'Coupon')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let coupon_ref01_data = Object.values(setup.data.existing.coupon)[0] as any

    // LIST
    const coupon_ref01_ent = client.Coupon()
    const coupon_ref01_match: any = {}

    const coupon_ref01_list = (await coupon_ref01_ent.list(coupon_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/coupon/CouponTestData.json')

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
    ['coupon01','coupon02','coupon03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MOCK_TEST_COUPON_ENTID': idmap,
    'MOCK_TEST_LIVE': 'FALSE',
    'MOCK_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['MOCK_TEST_COUPON_ENTID']

  const live = 'TRUE' === env.MOCK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MOCK_TEST_COUPON_ENTID']
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
  
