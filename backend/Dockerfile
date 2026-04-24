# 1. IMAGEM BASE: Escolhemos o PHP com Apache (servidor web) já incluído
FROM php:8.4-apache

# 2. DEPENDÊNCIAS DO SISTEMA: Instalamos o que o PHP precisa para processar ficheiros e ligar à DB
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    git \
    unzip \
    && docker-php-ext-install pdo_mysql gd

# 3. COMPOSER: Copiamos o executável do Composer de uma imagem oficial para a nossa
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 4. DIRETÓRIO DE TRABALHO: Onde o código vai morar dentro do contentor
WORKDIR /var/www/html

# 5. COPIAR CÓDIGO: Passamos os ficheiros do teu PC para o "disco rígido" do contentor
COPY . .

# 6. PERMISSÕES: O Laravel precisa de escrever nas pastas de storage e cache
RUN chown -R www-data:www-data storage bootstrap/cache

# 7. CONFIGURAÇÃO APACHE: Mudamos a "raiz" do servidor para a pasta /public do Laravel
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/php/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 8. ATIVAR REWRITE: Essencial para as rotas do Laravel funcionarem
RUN a2enmod rewrite