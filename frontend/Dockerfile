# Usamos o Node apenas para compilar o código
FROM node:20 AS builder

# Criamos a pasta de trabalho
WORKDIR /app

# Copiamos os ficheiros de dependências primeiro (ajuda na cache do Docker)
COPY package*.json ./
RUN npm install

# Copiamos o resto do teu código Angular
COPY . .

# Compilamos a aplicação para produção
RUN npm run build --configuration=production

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

# O COPY dos teus ficheiros dist (garante que o caminho está correto como falámos antes!)
COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html

# ADICIONA ESTA LINHA: Copiamos o nosso ficheiro de configuração personalizado
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]