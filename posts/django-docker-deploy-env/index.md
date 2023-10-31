---
title: Prepare Django for Docker deployment and development.
date: 2021-02-16
tags: [ django, docker, uwsgi, pipenv ]
cover: ./django-docker-alpine.png
---

# Prepare Django for Docker deployment and development

One of the caveats of Python development is managing version compatibility between some packages and the systems interpreter. Some versions of Python don't play well with legacy code and some packages simply do not compile in certain environments. Also, some packages are written in _C_ and _Rust_ which need to be compiled upon installation.

That's why developing and deploying a Python application written with Django is better when a controlled environment like a Virtual Machine or Deocker container is used.

In this article I'll try to create some Docker images for creating and deploying a Django application in a production environment like [EKS](https://aws.amazon.com/eks) but it also is usable for local development. After all, that's what Docker was made for, right?

Additionally, I'll create it in a way that some useful packages like Allauth and uWSGI are included.

By the way, I assume that you have some basic knowledge of Python, Docker and Django.

## TOC

```toc

```

## Project structure

Before we start le me show you what our project structure will look like:

```text
.
├── Pipfile
├── Pipfile.lock
├── config # This is our Django Project !
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── docker
│   ├── app
│   │   ├── Dockerfile
│   │   └── entrypoint.sh
│   └── nginx
│       ├── Dockerfile
│       ├── dev.conf
│       └── prod.conf
├── docker-compose-prod.yml
├── docker-compose.yml
├── appfiles
│   ├── media
│   └── static
│       └── unsplash.jpg
└── manage.py
```

3 Things to notice:

- The Django project will be called `config` because that's were the configuration files will live. That's something I picked up from [Django for Beginners](https://djangoforbeginners.com/)
- The `docker` folder will contain all our `Dockerfile` files and all of our _daemons_ configuarion.
- I'll use 2 `docker-compose` files. One for development and one for deployment in production.

But don't worry... I'll go step by step... Right now you should have an empty directory.

## Create a Docker image for `pipenv`

Like I said in the previous item, I'll store all the Docker assets in the `docker/` directory. That includes all the `Dockerfiles` for all the images I'll make and the daemon configurations files.

The first `Dockerfile`, the Python's `Dockerfile` will be placed in `docker/app/Dockerfile` and it will have the following contents:

```Dockerfile
# docker/app/Dockerfile
FROM python:3.9-alpine

ENV PYTHONUNBUFFERED 1

RUN mkdir -p /app \
    && apk add python3-dev build-base linux-headers pcre-dev \
        jpeg-dev zlib-dev \
        libffi-dev libressl-dev rust cargo \
        postgresql-dev \
    && pip install --no-cache-dir pipenv django

WORKDIR /app
```

That's a lot of stuff. Right?

We'll I'm only installing `pipenv` in this image, but since I'm going to use it to create a `Pipfile` that includes Django, Django-allauth, Psycopg2 and uWSGI. I need to install a bunch of development libraries:

- I'm creating the image from `python:3.9-alpine`.
- Then I'll install some compiling dependencies with `apk` before I install the python packages.
  - `python3-dev build-base linux-headers pcre-dev` are reqruied for uWSGI
  - `jpeg-dev` and `zlib-dev` for Django's image fields
  - `libffi-dev libressl-dev rust cargo` are required for django-allauth
  - `postgresql-dev` Is for Psycopg2

Now, let's create the **image**  `django-docker-image` by issuing:

```bash
docker build -f docker/app/Dockerfile . -t django-docker-image
```

> We use the `-f docker/app/Dockerfile` because our `Dockerfile` is not in the current directory.

This shouldn't take too long and it should result in something like.

```console {2}
$ docker images
django-docker-image            latest       50bc47366aa0   19 seconds ago   834MB
python                         3.9-alpine   85987b1a8b9d   11 days ago      44.7MB
```

Good, we have a fairly complete Python image where we can build our `Pipenv` and `Pipenv.lock` files

## Create the `Pipenv` and `Pipenv.lock` files

Now lets create the `Pipfile` and `Pipfile.lock` used for package installation with the following long command. But before that, go get a cup of coffee because this step can be long depending on your machine:

```bash
docker run --rm -v $PWD:/app -it django-docker-image \
  pipenv install django~=3.1.0 django-allauth~=0.44.0 psycopg2~=2.8.6 uwsgi~=2.0.19
```

Again, let me explain:

- `-v $PWD:/app` mounts our current path in the `/app/` container's directory.
- We're using the `pipenv` executable inside the `django-docker-image` image we just built.
- Were instructing the generated container to install some Python packages even tough we're going to discard them:
  - [Django](https://djangoproject.com)
  - [django-allauth](https://www.intenct.nl/projects/django-allauth/) for authentication
  - [Psycopg](https://www.psycopg.org/) for PostgreSQL connection
  - [uWSGI](https://uwsgi-docs.readthedocs.io/) for interfacing a web server with the python code

Also note that I used versions since I wanted to make sure that everything will work on production.

And just like magic we should have in the current directory the resulting `Pipfile`:

```console
$ ls -l
total 32
-rw-r--r--  1 mario  staff    225 15 feb 14:41 Pipfile
-rw-r--r--  1 mario  staff  11977 15 feb 14:41 Pipfile.lock
drwxr-xr-x  3 mario  staff     96 15 feb 14:13 docker
```

```toml
# Pipfile
[[source]]
url = "https://pypi.org/simple"
verify_ssl = true
name = "pypi"

[packages]
django = "~=3.1.0"
django-allauth = "~=0.44.0"
psycopg2 = "~=2.8.6"
uwsgi = "~=2.0.19"

[dev-packages]

[requires]
python_version = "3.9"
```

The `Pipfile.lock` is too long to show here, but is essential for our project since it will instruct python which versions to install on the _Container Building_ step.

## Add the `Pipfile` and `Pipfile.lock` to the image

Unfortunately, `pipenv` installed a bunch of packages on the **container** and not the image. That's why we need to update the `docker/app/Dockerfile` adding this 2 new files. And while we're at it, I'll add some optimizations and create a `django` user.

> To be sincere, there are ways to save the running container as an image, but I want to save every step of the process to Git.

```Dockerfile {7,41}
# docker/app/Dockerfile
FROM python:3.9-alpine

LABEL maintainer="Mario Yepes marioyepes.com"

ENV PYTHONUNBUFFERED=1 \
  PROJECT_DIR=/app/

COPY . ${PROJECT_DIR}
COPY --chmod=755 docker/app/entrypoint.sh /entrypoint.sh

WORKDIR ${PROJECT_DIR}
EXPOSE 8000 8080

RUN apk add --update --no-cache --virtual .tmp \
        python3-dev build-base linux-headers pcre-dev \
        jpeg-dev zlib-dev \
        libffi-dev libressl-dev rust cargo \
        postgresql-dev \
    && pip install --no-cache-dir pipenv \
    && pipenv install --system --deploy \
    && pipenv --clear \
    && find /usr/local \
        \( -type d -a -name test -o -name tests \) \
        -o \( -type f -a -name '*.pyc' -o -name '*.pyo' \) \
        -exec rm -rf '{}' + \
    && runDeps="$( \
        scanelf --needed --nobanner --recursive /usr/local \
                | awk '{ gsub(/,/, "\nso:", $2); print "so:" $2 }' \
                | sort -u \
                | xargs -r apk info --installed \
                | sort -u \
    )" \
    && apk add --virtual .rundeps $runDeps \
    && apk del .tmp \
    && adduser -D django


USER django

ENTRYPOINT ["sh", "/entrypoint.sh"]
CMD ["uwsgi", "--http", "0.0.0.0:8080", "--master", "--enable-threads", "--module", "config.wsgi"]

```

Whoa!!! That's one big `Dockerfile`. How come?

Well, I'm a big fan of optimization... Even if it can be the [root of all evil](https://www.clarkdever.com/2019/03/07/premature-optimization-is-the-root-of-all-evil/). But I just loooove watching numbers shrink down when you do things right. On our `django-docker-image` image, we ended up with a file that was 800M big. But it was because we kept all the development dependencies and we haven't removed any cached files.

So, after searching long and hard I came into this [blog post](https://nickjanetakis.com/blog/alpine-based-docker-images-make-a-difference-in-real-world-apps) by Nick Jenetakis. And learned about using a temporary directory to store our dev dependencies, clear any cached files, remove any `.pyc` and `.pyo` files and optimize any _elf_ libraries.

And what is that all other stuff in the `Dockerfile`?

- I add ports `8000` and `8080` as exposed ports to make it easier to access the Django App.
- I install the required python packages _globally_ using `pipenv install --system --deploy`
- After all installation is done, I create the user `django`
- I switch to the user `django` so any further command gets executed by that user
- I execute the `/entrypoint.sh` script using `wsgi uwsgi --http 0.0.0.0:8080 --master --enable-threads --module config.wsgi`

Don't start the container just yet! We need to create the **nonexistent** `entrypoint.sh` first.

## Create the ENTRYPOINT script

The `entrypoint.sh` script is what I will get executed once I transform this image into a container. But there is one important thing to take into account about this script: **this script will receive the following `CMD` command as parameter**. So the `entrypoint.sh` script needs to handle the fact that the user might pass parameters that she wants to execute after the container is instantiated:

```bash
#!/bin/sh
# docker/app/entrypoint.sh

set -euo pipefail

exec "$@"
```

Pretty simple right? I'm just saying that whatever is passed on the command line should be executed. But the next line in the `Dockerfile`, which is passed as a parameter, is the one that executes uWSGI.

Now, remove the old image and create a new one with the same name.

```bash
docker rmi django-docker-image
docker build -f docker/app/Dockerfile . -t django-docker-image
```

After optimizations, we have a 312M image size. That's almost a 40% savings from the "simpler" one

```console {2}
$ docker images
REPOSITORY                     TAG          IMAGE ID       CREATED         SIZE
django-docker-image            latest       935c141edaef   2 minutes ago   312MB
python                         3.9-alpine   85987b1a8b9d   12 days ago     44.7MB
```

To test the image, run a temp container with:

```bash
docker run --rm -it django-docker-image /bin/sh
```

## Executing the image with _Docker Compose_

We're going to use multiple services in this project. And that means that we need to use `docker-compose` to make them work together.

We can start by using a `docker-compose.yml` file to start the only service we have so far by adding the following content:

```yaml
# docker-compose.yml
version: '3'

services:
  # Django application
  app:
    build:
      context: .
      dockerfile: docker/app/Dockerfile
    container_name: django-docker-app
    ports:
      - "8080:8080"
    volumes:
      - ./:/app/

networks:
  default:
    name: django-network
```

And verify that it works by getting a shell by executing:

```bash
docker-compose run app /bin/bash
```

What I just did with that `docker-compose.yml` file was to replicate the commands:

```bash
docker build -f docker/app/Dockerfile . -t django-docker-image
docker run -v $PWD:/app -it django-docker-image /bin/sh
```

Cool. We're finally ready to start the Django application:

## Create the Django project

Using `docker-compose` lest create the Django Application by issuing:

```bash
docker-compose run app django-admin startproject config .
docker-compose rm
```

This is a long command but it should be familiar:

- `docker-compose run app` creates the containers declared in the file and runs the one identified by `app`.
- `django-admin startproject config .` is to create the Django project `config` in the current directory.

> I added the `docker-compose rm` to remove the container that we used for a single command.

Now we should have a `config/` directory and a `manage.py` file in our current directory.

```bash
$ ls -l
total 32
-rw-r--r--  1 mario  staff   197 16 feb 10:33 Pipfile
-rw-r--r--  1 mario  staff  3446 16 feb 10:34 Pipfile.lock
drwxr-xr-x  7 mario  staff   224 16 feb 14:16 config
drwxr-xr-x  3 mario  staff    96 16 feb 10:27 docker
-rw-r--r--  1 mario  staff   317 16 feb 14:12 docker-compose.yml
-rwxr-xr-x  1 mario  staff   662 16 feb 14:16 manage.py
```

And since we have a Django application we can finally test it with:

```bash
docker-compose up
```

You can open the `http://localhost:8080` URL with your browser and check that the Django placeholder pages is running.

Notice that the port is `8080` which is the port we configured in the `Dockerfile`on the `uwsgi` line.

## Adding PostgreSQL

Lets recap:

- We created a Django Docker image
- We created the `Pipfile` and `Pipfile.lock` with that image
- We modified the `docker/app/Dockerfile` so our image was smaller and included Django, uWSGI and other packages
- We executed `django-admin` with the `startproject` param to create the Django project

It's time to add a PostgreSQL to our project. And for that we need to create a `docker-compose.yml` image. So both services can start at the same time, and talk to each other.

Luckily, the official [PostgreSQL Docker image](https://hub.docker.com/_/postgres/) has everything we need and there is no need to create new images for our database.

But we do need to update the `docker-compose.yml` file so both our Django Project and the Database can run together and talk to each other:

```yaml {20-33}
# docker-compose.yml
version: '3'

services:
  # Django application
  app:
    build:
      context: .
      dockerfile: docker/app/Dockerfile
    container_name: django-docker-app
    ports:
      - "8080:8080"
    env_file:
      - .env
    volumes:
      - ./:/app/
    depends_on:
      - postgres

  # PostgreSQL Database
  postgres:
    image: postgres:13-alpine
    container_name: django-docker-db
    ports:
      - "5432:5432"
    env_file:
      - .env
    volumes:
      - pgdata:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  pgdata:

networks:
  default:
    name: django-network
```

Notice the lines that have `.env` in it, what are those?

According to [Postgre's Dockerhub page](https://hub.docker.com/_/postgres/) we need to configure 3 **environment** variables:

- `POSTGRES_PASSWORD`
- `POSTGRES_USER`
- `POSTGRES_DB`

And since those variables have to be shared with the Django App, it easier to create the `.env` file with this values:

```bash
# .env

# Database configuration
POSTGRES_PASSWORD=postgres
POSTGRES_USER=postgres
POSTGRES_DB=postgres
```

And run both containers with:

```bash
docker-compose up
```

Great, we have a database running... Which we won't use just yet.

## Change the `settings.py` file to use PostgreSQL and environment variables

We have to do 2 things in the `config/settings.py` file:

- Configure our Django project to use PostgreSQL instead of SQLite
- Have the `DEBUG`, `ALLOWED_HOSTS` and `SECRET_KEY` be taken from the environment.

First add some additional variables to the `.env` file that affect only Django:

```sh {7-12}
# .env

# Database configuration
POSTGRES_PASSWORD=postgres
POSTGRES_USER=postgres
POSTGRES_DB=postgres
POSTGRES_HOST=postgres # new

# Django development configuration
SECRET_KEY='temporarykey123456789'
DEBUG=1
ALLOWED_HOSTS=*
```

Then change the `settings.py` file making some sensible or variable data be taken from the environment:

```python
# config/settings.py
import os
# ...
SECRET_KEY = os.environ.get('SECRET_KEY', '')
# ...
DEBUG = int(os.environ.get('DEBUG', 0))
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '127.0.0.1').strip().replace(' ', '').split(',')
# ...
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('POSTGRES_DB', ''),
        'USER': os.environ.get('POSTGRES_USER', ''),
        'PASSWORD': os.environ.get('POSTGRES_PASSWORD', ''),
        'HOST':os.environ.get('POSTGRES_HOST', ''),
        'PORT': 5432
    }
}
```

> I'm showing just the changes.

And test everything by making the migrations:

```bash
docker-compose rm # make sure that there are no dangling containers
docker-compose up -d # Run dettached
docker-compose exec app python manage.py makemigrations
docker-compose exec app python manage.py migrate
```

> We're using exec since we want to execute the commands on the currently running `app` container.

And you should see a message like:

```console
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, sessions
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  Applying admin.0001_initial... OK
  Applying admin.0002_logentry_remove_auto_add... OK
  Applying admin.0003_logentry_add_action_flag_choices... OK
  Applying contenttypes.0002_remove_content_type_name... OK
  Applying auth.0002_alter_permission_name_max_length... OK
  Applying auth.0003_alter_user_email_max_length... OK
  Applying auth.0004_alter_user_username_opts... OK
  Applying auth.0005_alter_user_last_login_null... OK
  Applying auth.0006_require_contenttypes_0002... OK
  Applying auth.0007_alter_validators_add_error_messages... OK
  Applying auth.0008_alter_user_username_max_length... OK
  Applying auth.0009_alter_user_last_name_max_length... OK
  Applying auth.0010_alter_group_name_max_length... OK
  Applying auth.0011_update_proxy_permissions... OK
  Applying auth.0012_alter_user_first_name_max_length... OK
  Applying sessions.0001_initial... OK
```

If you are interested in just having a development environment, you can stop here. But you want to make everything ready for deployment, read along.

## Adding Nginx

We need a proxy... Well... If you are planning to go to production.

Even tough uWSGI can serve static files, Nginx is the gold standard to do that. So it's advisable to put nginx between the Docker App and the Internet so it serves static files and takes care of SLL certificates.

As with the Django App, we'll need to create a custom image since we need to specify where the static files will live and how to pass dynamic request to the Django Application.

First create the `docker/nginx/dev.conf` file with the following content:

```nginx {13,17,21}
# docker/nginx/dev.conf
upstream django {
  server app:8080;
}

server {
  listen       8080;
  server_name  localhost;
  charset utf-8;
  client_max_body_size 75M;

  location /static {
    alias /appfiles/static;
  }

  location /media {
    alias /appfiles/media;
  }

  location / {
    proxy_pass http://django;
  }
}
```

This file tells nginx to:

- Recognize the `app` host which is our Django Application container.
- Listen to the port `8080`
- Any request done to URL's staring with `/static/` and `/media/` will be for files in `/appfiles/static` and `/appfiles/media`.
- Pass any other request to the local `8080` port, where our _dev_ server serves.

Then add a new **service** called `nginx` and remove the "ports" section from `app`. Also add the `/appfiles` volume on `app`.

```yaml {4,5,8}
services:
  # Django application
  app:
    # ports: # remove this
    #   - "8080:8080" # remove this
    volumes:
      - .:/app
      - ./appfiles:/appfiles # new
#...
  # Nginx as proxy server.
  nginx:
    build:
      context: .
      dockerfile: docker/nginx/Dockerfile
    container_name: django-docker-proxy
    ports:
      - "8080:8080"
    volumes:
      - ./docker/nginx/dev.conf:/etc/nginx/conf.d/default.conf
      - ./appfiles/static/:/appfiles/static/
      - ./appfiles/media/:/appfiles/media/
    restart: unless-stopped
    depends_on:
      - app
```

Then create a `Dockerfile` to build the nginx image:

```Dockerfile
# docker/nginx/Dockerfile
FROM nginx:1-alpine

COPY docker/nginx/dev.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

RUN mkdir -p /appfiles/media \
  && mkdir -p /appfiles/static \
  && chmod 777 /appfiles/media \
  && chmod 755 /appfiles/static
```

And test that everything works by executing

```bash
docker-compose down
docker-compose rm
docker-compose up -d
```

And verify that you can access `0.0.0.0` but on port **8080** (<http://localhost:8080>)

Make an additional test: Create a file in `files/media/` on your laptop and verify that you have access to it:

```bash
curl -L https://unsplash.com/photos/bXfQLglc81U/download\?force\=true\&w\=640 > appfiles/media/test-file.jpg
```

And visit `http://0.0.0.0:8080/media/test-file.jpg`

Finally, change your `config/settings.py` to recognize the `files/media` and `files/static` as places where static files will be placed:

```python
# config/settings.py
# ...
STATIC_URL = '/static/'
STATIC_ROOT = '/files/static' # add
MEDIA_URL = '/media/'         # add
MEDIA_ROOT = '/files/media'   # add
```

And test with:

```console
$ docker-compose run app python manage.py collectstatic
Starting django-database ... done
Creating chimigo-crm_app_run ... done

132 static files copied to '/files/static'.

$ ls files/static
```

## Nginx setup for production

```nginx
# docker/nginx/prod.conf
server {
  listen 8080;
  default_server;

  location /static {
    alias /files/static;
  }

  location / {
    uwsgi_pass app:8000;
    uwsgi_param QUERY_STRING $query_string;
    uwsgi_param REQUEST_METHOD $request_method;
    uwsgi_param CONTENT_TYPE $content_type;
    uwsgi_param CONTENT_LENGTH $content_length;
    uwsgi_param REQUEST_URI $request_uri;
    uwsgi_param PATH_INFO $document_uri;
    uwsgi_param DOCUMENT_ROOT $document_root;
    uwsgi_param SERVER_PROTOCOL $server_protocol;
    uwsgi_param REMOTE_ADDR $remote_addr;
    uwsgi_param REMOTE_PORT $remote_port;
    uwsgi_param SERVER_ADDR $server_addr;
    uwsgi_param SERVER_PORT $server_port;
    uwsgi_param SERVER_NAME $server_name;
  }
}
```

```console
docker-compose -f docker-compose.prod.yml run app python manage.py collectstatic --noinput
```
