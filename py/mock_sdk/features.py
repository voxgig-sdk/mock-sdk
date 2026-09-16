# Mock SDK feature factory

from mock_sdk.feature.base_feature import MockBaseFeature
from mock_sdk.feature.ratelimit_feature import MockRatelimitFeature
from mock_sdk.feature.retry_feature import MockRetryFeature
from mock_sdk.feature.test_feature import MockTestFeature
from mock_sdk.feature.timeout_feature import MockTimeoutFeature


_FEATURES = {
    "base": lambda: MockBaseFeature(),
    "ratelimit": lambda: MockRatelimitFeature(),
    "retry": lambda: MockRetryFeature(),
    "test": lambda: MockTestFeature(),
    "timeout": lambda: MockTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
