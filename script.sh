#!/bin/bash

# Função para verificar se Yarn está instalado
check_yarn() {
  if ! [ -x "$(command -v yarn)" ]; then
    echo 'Yarn não está instalado. Instalando agora...'
    npm install -g yarn
  else
    echo 'Yarn já está instalado!'
  fi
}

# Função para garantir que o Strapi e Vue CLI estão corretamente instalados no backend e frontend
check_dependencies() {
  local dir=$1

  echo "Verificando dependências em $dir..."
  cd "$dir"

  # Remover node_modules e yarn.lock, se existirem
  if [ -d "node_modules" ]; then
    echo "Removendo node_modules..."
    rm -rf node_modules
  fi

  if [ -f "yarn.lock" ]; then
    echo "Removendo yarn.lock..."
    rm yarn.lock
  fi

  # Reinstalar dependências
  echo "Instalando dependências..."
  yarn install

  cd - > /dev/null
}

# Função para rodar o backend (Strapi)
start_backend() {
  echo "Iniciando o backend..."
  cd ./catalogo-livros-api  # Diretório do backend

  check_dependencies "."  # Verificar dependências no backend

  if [ -f "./node_modules/.bin/strapi" ]; then
    echo "Executando Strapi..."
    yarn strapi develop &  # Executa o backend em segundo plano
    BACKEND_PID=$!
    echo "Backend rodando com PID $BACKEND_PID"
  else
    echo "Erro: Strapi não encontrado após reinstalação."
    exit 1
  fi

  cd - > /dev/null
}

# Função para rodar o frontend (Vue CLI)
start_frontend() {
  echo "Iniciando o frontend..."
  cd ../catalogo-livros  # Diretório do frontend

  check_dependencies "."  # Verificar dependências no frontend

  if [ -f "./node_modules/.bin/vue-cli-service" ]; then
    echo "Executando Vue CLI Service..."
    yarn serve  # Executa o frontend e mantém o terminal liberado
  else
    echo "Erro: Vue CLI Service não encontrado após reinstalação."
    exit 1
  fi

  cd - > /dev/null
}

# Função para encerrar os servidores ao finalizar o script
stop_servers() {
  echo "Parando o backend..."
  kill $BACKEND_PID
}

# Verifica se Yarn está instalado
check_yarn

# Inicia o backend em segundo plano
start_backend

# Inicia o frontend
start_frontend

# Espera até que os servidores sejam parados (ao encerrar o script)
trap stop_servers EXIT
