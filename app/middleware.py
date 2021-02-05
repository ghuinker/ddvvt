import time
from django.db import connection


def prCyan(skk): print("\033[96m {}\033[00m" .format(skk))

class DebugMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        start = time.time()
        response = self.get_response(request)
        end = time.time()

        qs = connection.queries
        queries = [q for q in qs]
        s = 'DEBUG: Queries: {}, Time: {:.4f}'.format(str(len(queries)), end - start)
        prCyan(s)

        return response

