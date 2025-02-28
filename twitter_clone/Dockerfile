# Usar uma imagem base do Python
FROM python:3.12-slim

# Configurar variáveis de ambiente essenciais para o Python e o Poetry
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
    VENV_PATH="/opt/pysetup/.venv" \
    POETRY_NO_DEV=1

# Atualizar e instalar dependências do sistema
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

# Definir o diretório de trabalho para a aplicação
WORKDIR /app

# Copiar os arquivos de configuração do Poetry para o diretório de trabalho
COPY poetry.lock pyproject.toml ./

# Instalar as dependências do projeto utilizando o Poetry sem as dependências de desenvolvimento
RUN poetry install --no-root -vvv

# Verificar se o Django foi instalado corretamente
RUN /opt/poetry/bin/poetry run python -m django --version

# Copiar o restante do código da aplicação
COPY . .

# Expor a porta utilizada pelo Gunicorn
EXPOSE 8000

# Comando para iniciar o Gunicorn usando o contexto do Poetry
CMD ["/opt/poetry/bin/poetry", "run", "gunicorn", "--chdir", "./twitter_clone", "twitter_clone.wsgi:application", "--bind", "0.0.0.0:8000", "--log-file", "-", "--log-level", "debug"]
