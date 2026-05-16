# ProjectName SDK exists test

import pytest
from mock_sdk import MockSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = MockSDK.test(None, None)
        assert testsdk is not None
