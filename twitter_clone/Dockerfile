# Usar uma imagem base do Python
FROM python:3.12-slim

# Configurar variáveis de ambiente para Python
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

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

# Adicionar o Poetry ao PATH
ENV PATH="/root/.local/bin:$PATH"

# Definir o diretório de trabalho
WORKDIR /app


# Copiar arquivos de configuração do Poetry
COPY poetry.lock pyproject.toml ./


# Instalar dependências do projeto usando o Poetry
RUN poetry install --no-root --without dev


# Copiar o resto do código do projeto
COPY . .

# Expor a porta que o Gunicorn usará
EXPOSE 8000

# Comando para rodar o Gunicorn
CMD ["gunicorn", "--chdir", "./twitter_clone", "twitter_clone.wsgi:application", "--bind", "0.0.0.0:8000", "--log-file", "-", "--log-level", "debug"]

