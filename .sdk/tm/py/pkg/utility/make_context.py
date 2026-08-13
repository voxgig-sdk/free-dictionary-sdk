# FreeDictionary SDK utility: make_context

from projectname_sdk.core.context import FreeDictionaryContext


def make_context_util(ctxmap, basectx):
    return FreeDictionaryContext(ctxmap, basectx)
