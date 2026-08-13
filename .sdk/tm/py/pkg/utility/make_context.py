# Mock SDK utility: make_context

from projectname_sdk.core.context import MockContext


def make_context_util(ctxmap, basectx):
    return MockContext(ctxmap, basectx)
