# Phalcon PHP Application with Docker

## Create the docker file

- Dockerfile
- phalcon.conf
- entrypoint.sh

```Dockerfile
# /docker/Dockerfile
FROM php:7-apache

EXPOSE 80

COPY docker/apache-site-atcs.conf /etc/apache2/sites-available/atcs.conf

RUN set -eux \
	&& apt-get -qq update \
    && pecl channel-update pecl.php.net \
	&& apt-get install -qq -y --no-install-recommends git libpcre3-dev libzip-dev \
    && docker-php-ext-install -j "$(nproc)" bcmath exif mysqli zip \
    && pecl install psr \
    && docker-php-ext-enable psr \
	&& a2enmod rewrite expires \
    && a2dissite 000-default \
    && mkdir /var/www/atcs \
    && chmod ugo+rx /var/www/atcs \
    && a2ensite atcs

RUN set -eux \
    cd /tmp \
    && git clone --depth=1 https://github.com/phalcon/cphalcon \
    && cd cphalcon/build \
    && ./install \
	&& docker-php-ext-enable phalcon \
    && rm -rf /tmp/cphalcon \
    && apt-get -y autoremove

RUN set -eux \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY --chmod=755 docker/docker-entrypoint.sh /usr/local/bin/ 
COPY . /var/www/atcs

WORKDIR /var/www/atcs
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["apache2-foreground"]
```

```apache
# docker/site.conf
<VirtualHost *:80>
	ServerAdmin marioy47@gmail.com
	DocumentRoot /var/www/atcs/api
	ErrorLog ${APACHE_LOG_DIR}/error.log
	CustomLog ${APACHE_LOG_DIR}/access.log combined
	<Directory /var/www/atcs>
		AllowOverride All
	</Directory>
</VirtualHost>
```

```bash
#!/usr/bin/env bash
# docker/docker-entrypont.sh
set -Eeuo pipefail

exec "$@"
```

```bash
docker-compose build
```


## Start the VM

```bash
docker-compose up
```

## Init the project

On a new terminal

```bash
docker-compose exec app composer init \
  --name marioy47/bairesdev-atcs \
  --description "A interview challange"  \
  --author "Mario Yepes <myemail@example.com>" \
  --stability alpha \
  --type project \
  --license gpl \
  --require-dev phalcon/devtools
```

## Create commands

```bash
docker-compose exec app composer phalcon project acts
mv acts/{app,cache,public,index.html} .
```

# Hostinger Blog notes

## Phalcon folder structure

Is not mandatory since Phalcon is loosely copuled, but is recommeded. Specially if you are working on a team.

- **App** That's where the main application will live
  - `config` Database connection or adding a new libery
  - `controllers` process requests and formulates responses
  - `library` External third party libraries
  - `migrations` Data migration
  - `models` Interacting with the database
  - `views` Its a MVC using the volt templating system
- **Cache** For performance
- **Public** Public Images, css, js, etc.


![Phalcon directory structure ifographic](https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2018/02/phalcon-framework-directory-structure-infographic.png) 

## Creating a database

Has to be executing the command on the **db** _service_.

```bash
docker-compose exec db which mysql -u root -proot -e "CREATE DATABASE atcs"
docker-compose exec app mysql -u root -p -e "GRANT ALL PRIVILEGES ON atcs.* TO atcs@localhost IDENTIFIED BY 'atcs'; FLUSH PRIVILEGES;"
```

## Configure database access

In `app/config/config.php` change the connection details.

## Adding a new Model and Controller

```bash
docker-compose exec app phalcon model users
docker-compose exec app phalcon controller Signup
```
Will create a file in `app/model/Users.php` and `app/controllers/SignupController.php`

All functions on the **controller** finish with the `Action` suffix if you want them to be accessed.

## Views

The are located at `app/views/` and each view has a **dedicated directory**.

Template files have the `.phtml` extension.

## Node


# End

## Final toughts

The only clear and recent resource I could find was [this Hostinger article](https://www.hostinger.com/tutorials/phalcon-tutorial).

If you are getting too many issues with Phalcon, you could also try [Lumen](https://lumen.laravel.com) wich is also very fast an just perfect if you just want to create an [API endpoing](https://auth0.com/blog/developing-restful-apis-with-lumen/)
