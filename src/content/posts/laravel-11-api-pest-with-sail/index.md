---
title: Add support to REST API and Pest on Sail created Laravel application
cover: ./laravel-11.avif
date: 2024-05-29
tags: [php, laravel, phpunit, pest, rest]
---

# Add support to REST API and Pest on Sail created Laravel application

This is a short one. This is small recipe on how to circumvent 2 situations with Laravel 11 when a project is created with `sail`:

- Enable API support
- Switch `phpunit` for `pest`

## TOC

## Setting up a Laravel 11 with Sail

To start a project with [Laravel Sail](https://laravel.com/docs/11.x/sail), the process is the same as always:

_I'm assuming that you've added the global `sail` alias_

```bash
curl -s "https://laravel.build/laravel-with-pest?with=mariadb" | bash
cd laravel-with-pest
sail up -d
sail artisan migrate # New in 11
sail artisan db:show
```

I added the `sail artisan migrate` line since there seems to be a bug (or I'm just missing something) where the initial migration gets executed before the _MariaDB_ container gets initialized.

If you execute `sail artisan db:show`, you should get something like...

```text {8,11-20}
  MariaDB .......................................................... 10.11.8
  Database ......................................................... laravel
  Host ............................................................. mariadb
  Port ................................................................ 3306
  Username ............................................................ sail
  URL ......................................................................
  Open Connections ....................................................... 1
  Tables ................................................................. 9
  Total Size ..................................................... 224.00 KB

  Table ............................................................... Size
  cache ........................................................... 16.00 KB
  cache_locks ..................................................... 16.00 KB
  failed_jobs ..................................................... 32.00 KB
  jobs ............................................................ 32.00 KB
  job_batches ..................................................... 16.00 KB
  migrations ...................................................... 16.00 KB
  password_reset_tokens ........................................... 16.00 KB
  sessions ........................................................ 48.00 KB
  users ........................................................... 32.00 KB
```

8 tables. Let's take a note of that.

## Replace `phpunit` with `pest`

Laravel Sail does not ask you for a testing framework as [Laravel Herd](https://herd.laravel.com/) or the `composer create-project laravel/laravel example-app` command does.

Fortunately, changing the testing framework from `phpunit` to `pest` is not so difficult. Just remove `phpunit`, install `pest` and initialize it:

```bash
sail composer remove phpunit/phpunit --dev
sail composer require pestphp/pest --dev --with-all-dependencies
sail composer require pestphp/pest-plugin-laravel --dev
sail pest --init
```

To finish the testing framework migration, I'll use `pest drift` command to migrate the default tests to the `pest` syntax:

```bash
sail composer require pestphp/pest-plugin-drift --dev
sail pest --drift
```

You can verify that `pest` is installed and the tests are migrated with:

```bash
cat tests/{Unit,Feature}/ExampleTest.php
ls tests/Pest.php
```

Since we no longer need the _pest migration_ package, we can remove it:

```bash
sail composer remove pestphp/pest-plugin-drift --dev
```

And now, to execute a test, you only have to execute `pest` trough sail like so:

```bash
sail pest
```

## Create the API Routes

Since Laravel 11, API support is not installed by default, but as everything with Laravel, you just need to execute a couple of commands and your set.

In this case just execute

```bash
sail artisan install:api
sail artisan migrate # Optional if you didn't selected yes in the prev command
```

This will:

- Install [Laravel Sanctum](https://laravel.com/docs/sanctum) for API authentication
- Create the `config/sanctum.php` file
- Create the `database/migrations/<date>_create_personal_access_tokens_table.php` migration
- Create the `routes/api.php` file
- Modifies the `bootstrap/app.php` file adding the `routes/api.php` route in the `withRouting` function

You can verify that the authentication tables got create with:

```bash
sail artisan db:show
```

And you should get something like

```text
  MariaDB .......................................................... 10.11.8
  Database ......................................................... laravel
  Host ............................................................. mariadb
  Port ................................................................ 3306
  Username ............................................................ sail
  URL ......................................................................
  Open Connections ....................................................... 1
  Tables ................................................................ 10
  Total Size ..................................................... 272.00 KB

  Table ............................................................... Size
  cache ........................................................... 16.00 KB
  cache_locks ..................................................... 16.00 KB
  failed_jobs ..................................................... 32.00 KB
  jobs ............................................................ 32.00 KB
  job_batches ..................................................... 16.00 KB
  migrations ...................................................... 16.00 KB
  password_reset_tokens ........................................... 16.00 KB
  personal_access_tokens .......................................... 48.00 KB
  sessions ........................................................ 48.00 KB
  users ........................................................... 32.00 KB

```

And that's it... You have an API application with `pest` support.
