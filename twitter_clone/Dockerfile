# Usar uma imagem base
FROM python:3.12-slim

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
RUN curl -sSL https://install.python-poetry.org | python3 - && \
    /opt/poetry/bin/poetry --version

# Adicionar o Poetry ao PATH
ENV PATH="/opt/poetry/bin:$PATH"

# Definir o diretório de trabalho
WORKDIR /app

# Copiar arquivos do projeto para um diretório temporário
COPY . /tmp/

# Copiar arquivos do diretório temporário para o diretório de trabalho
RUN cp /tmp/poetry.lock /app/ && cp /tmp/pyproject.toml /app/

# Adicionar depuração para garantir que os arquivos foram copiados
RUN echo "Arquivos no diretório atual após a cópia:" && ls -l /app

# Instalar dependências do projeto usando o Poetry
RUN poetry install --no-root -vvv

# Copiar o resto do código do projeto
COPY . .

# Comando padrão
CMD ["python", "manage.py", "runserver"]
