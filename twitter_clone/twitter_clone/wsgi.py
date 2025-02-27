import os
import sys
import traceback
import logging

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'twitter_clone.settings')

try:
    application = get_wsgi_application()
except Exception:
    logging.error("WSGI exception: %s", traceback.format_exc())
    sys.exit(128)
