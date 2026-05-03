FROM php:8.5-fpm-alpine

ARG UID=1000
ARG GID=1000

RUN apk add --no-cache \
    bash \
    curl \
    git \
    icu-dev \
    libzip-dev \
    oniguruma-dev \
    unzip \
    zip \
    && docker-php-ext-install intl mbstring pdo_mysql zip \
    && pecl install redis \
    && docker-php-ext-enable redis

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

RUN addgroup -g ${GID} solvara \
    && adduser -D -G solvara -u ${UID} solvara

WORKDIR /var/www/html

USER solvara

CMD ["php-fpm"]
