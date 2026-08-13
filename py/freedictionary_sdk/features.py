# FreeDictionary SDK feature factory

from freedictionary_sdk.feature.base_feature import FreeDictionaryBaseFeature
from freedictionary_sdk.feature.test_feature import FreeDictionaryTestFeature


def _make_feature(name):
    features = {
        "base": lambda: FreeDictionaryBaseFeature(),
        "test": lambda: FreeDictionaryTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
