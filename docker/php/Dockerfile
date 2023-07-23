FROM php:8.2-fpm

RUN apt update && apt install -y \
    libicu-dev \
    libzip-dev \
    libpq-dev \
    git \
    zip \
    unzip

RUN docker-php-ext-configure intl

RUN docker-php-ext-install \
    zip \
    calendar

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
 && php composer-setup.php \
 && php -r "unlink('composer-setup.php');" \
 && mv composer.phar /usr/local/bin/composer

EXPOSE 9000

WORKDIR /var/www/html
