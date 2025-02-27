# Use a imagem base do Python
FROM python:3.12-slim AS base

# Variáveis de ambiente para Python e Poetry
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    POETRY_VERSION=1.6.1 \
    POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    POETRY_NO_INTERACTION=1 \
    PYSETUP_PATH="/opt/pysetup" \
    VENV_PATH="/opt/pysetup/.venv"

# Adicionar Poetry e o virtualenv ao PATH
ENV PATH="$POETRY_HOME/bin:$VENV_PATH/bin:$PATH"

# Instalar dependências necessárias e o Poetry
RUN apt-get update && apt-get install --no-install-recommends -y \
        curl \
        build-essential \
        libpq-dev \
        gcc \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && curl -sSL https://install.python-poetry.org | python3 - --version $POETRY_VERSION \
    && pip install --no-cache-dir psycopg2

# Define o diretório de trabalho
WORKDIR $PYSETUP_PATH

# Copia os arquivos de configuração do Poetry
COPY poetry.lock pyproject.toml ./

# Instalar dependências do projeto usando o Poetry
RUN poetry install --no-root -vvv

# Define o diretório de trabalho para o código da aplicação
WORKDIR /app

# Copia o código da aplicação
COPY . /app/

# Coletar arquivos estáticos
RUN python manage.py collectstatic --noinput

# Expor a porta 8000
EXPOSE 8000

# Comando para rodar a aplicação com Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "twitter_clone.wsgi:application"]
