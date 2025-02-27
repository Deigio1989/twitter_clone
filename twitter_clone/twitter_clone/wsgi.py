import os
import sys
import logging
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'twitter_clone.settings')

logging.basicConfig(level=logging.DEBUG)
try:
    application = get_wsgi_application()
except Exception:
    logging.error("Erro ao iniciar o WSGI", exc_info=True)
    sys.exit(128)
