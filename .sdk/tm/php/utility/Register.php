<?php
declare(strict_types=1);

// Mock SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

MockUtility::setRegistrar(function (MockUtility $u): void {
    $u->clean = [MockClean::class, 'call'];
    $u->done = [MockDone::class, 'call'];
    $u->make_error = [MockMakeError::class, 'call'];
    $u->feature_add = [MockFeatureAdd::class, 'call'];
    $u->feature_hook = [MockFeatureHook::class, 'call'];
    $u->feature_init = [MockFeatureInit::class, 'call'];
    $u->fetcher = [MockFetcher::class, 'call'];
    $u->make_fetch_def = [MockMakeFetchDef::class, 'call'];
    $u->make_context = [MockMakeContext::class, 'call'];
    $u->make_options = [MockMakeOptions::class, 'call'];
    $u->make_request = [MockMakeRequest::class, 'call'];
    $u->make_response = [MockMakeResponse::class, 'call'];
    $u->make_result = [MockMakeResult::class, 'call'];
    $u->make_point = [MockMakePoint::class, 'call'];
    $u->make_spec = [MockMakeSpec::class, 'call'];
    $u->make_url = [MockMakeUrl::class, 'call'];
    $u->param = [MockParam::class, 'call'];
    $u->prepare_auth = [MockPrepareAuth::class, 'call'];
    $u->prepare_body = [MockPrepareBody::class, 'call'];
    $u->prepare_headers = [MockPrepareHeaders::class, 'call'];
    $u->prepare_method = [MockPrepareMethod::class, 'call'];
    $u->prepare_params = [MockPrepareParams::class, 'call'];
    $u->prepare_path = [MockPreparePath::class, 'call'];
    $u->prepare_query = [MockPrepareQuery::class, 'call'];
    $u->result_basic = [MockResultBasic::class, 'call'];
    $u->result_body = [MockResultBody::class, 'call'];
    $u->result_headers = [MockResultHeaders::class, 'call'];
    $u->transform_request = [MockTransformRequest::class, 'call'];
    $u->transform_response = [MockTransformResponse::class, 'call'];
});
