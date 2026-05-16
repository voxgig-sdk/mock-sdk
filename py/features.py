# Mock SDK feature factory

from feature.base_feature import MockBaseFeature
from feature.test_feature import MockTestFeature


def _make_feature(name):
    features = {
        "base": lambda: MockBaseFeature(),
        "test": lambda: MockTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
