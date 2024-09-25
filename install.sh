#!/bin/bash

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null
then
    echo "Node.js não está instalado. Instale-o para continuar."
    exit
fi

# Verificar se o npm está instalado
if ! command -v npm &> /dev/null
then
    echo "npm não está instalado. Instale-o para continuar."
    exit
fi

# Instalar as dependências do Node.js
echo "Instalando dependências do Node.js..."
npm install

# Configurar permissões para a porta serial
echo "Configurando permissões para a porta
