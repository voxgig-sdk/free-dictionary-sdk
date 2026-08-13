# FreeDictionary SDK exists test

import pytest
from freedictionary_sdk import FreeDictionarySDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = FreeDictionarySDK.test(None, None)
        assert testsdk is not None
