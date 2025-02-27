# Usar uma imagem base
FROM python:3.12-slim

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
    mv /root/.local/bin/poetry /usr/local/bin/

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos de configuração do Poetry
COPY poetry.lock pyproject.toml ./

# Instalar dependências do projeto usando o Poetry
RUN poetry install --no-root -vvv

# Copiar o resto do código do projeto
COPY . .

# Comando padrão
CMD ["python", "manage.py", "runserver"]