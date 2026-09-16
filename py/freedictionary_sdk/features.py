# FreeDictionary SDK feature factory

from freedictionary_sdk.feature.base_feature import FreeDictionaryBaseFeature
from freedictionary_sdk.feature.ratelimit_feature import FreeDictionaryRatelimitFeature
from freedictionary_sdk.feature.retry_feature import FreeDictionaryRetryFeature
from freedictionary_sdk.feature.test_feature import FreeDictionaryTestFeature
from freedictionary_sdk.feature.timeout_feature import FreeDictionaryTimeoutFeature


_FEATURES = {
    "base": lambda: FreeDictionaryBaseFeature(),
    "ratelimit": lambda: FreeDictionaryRatelimitFeature(),
    "retry": lambda: FreeDictionaryRetryFeature(),
    "test": lambda: FreeDictionaryTestFeature(),
    "timeout": lambda: FreeDictionaryTimeoutFeature(),
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
