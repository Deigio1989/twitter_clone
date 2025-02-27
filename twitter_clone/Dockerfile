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

# Atualizar e instalar dependências
RUN apt-get update && apt-get install --no-install-recommends -y \
    curl \
    build-essential \
    libpq-dev \
    gcc \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Instalar o Poetry
RUN curl -sSL https://install.python-poetry.org | python3 -

# Definir o diretório de trabalho
WORKDIR /app


# Adicionar depuração
RUN ls -l /app

# Instalar dependências do projeto usando o Poetry
RUN poetry install --no-root -vvv

# Copiar o resto do código do projeto
COPY . .

# Comando padrão
CMD ["python", "manage.py", "runserver"]
