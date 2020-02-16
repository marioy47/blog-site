---
title: Configure PHP_CodeSniffer and Visual Studio Code to manage coding standards for WordPress Development
date: 2019-12-25
tags: phpcs, phpcbf, wordpress, vscode, composer, php
---

# Configure PHP_CodeSniffer and Visual Studio Code to manage coding standards for WordPress Development

In this article I'll try to show you how to setup a development environment for a WordPress plugin that follows the WordPress coding standards.

I'll be using [Composer](https://getcomposer.org/) for installing all the packages and configuring namespaces for autoloading. So be sure to have it installed globally first.

Be noted that there are some standards that will not be followed like the file naming, since I want to be able to use `composer` packages with autoloading without too much hassle.

## Start the project

The first step is easy.. just create a folder in you plugins directory and start composer.

```bash
cd /path/to/wordpress/wp-content/plugins/
mkdir my-plugin && cd my-plugin/
composer init
```

Answer the questions that composer issues like the name of the package and the author.

In my case, I didn't defined dependencies just yet so my `composer.json` file looks like this:

```json
// composer.json
{
  "name": "marioy47/wordpress-phpcs",
  "description": "Test for phpcs in wordpress",
  "type": "project",
  "authors": [
    {
      "name": "Mario Yepes",
      "email": "marioy47@gmail.com"
    }
  ],
  "require": {}
}
```

## Install PHPCS Composer Installer

This is a `composer` package that makes installing PHP_CodeSniffer files easier and per project (as opposed of globally).

So in a terminal, just issue the following command:

```bash
composer require --dev 'dealerdirect/phpcodesniffer-composer-installer:*'
```

This might take a little while if this is the first time that you execute a `composer require ...` command in you environment since it has to verify all versions and create local copies of files.

After the command finishes, **add** the following lines to `composer.json`

```json
// composer.json
{
  // ...
  "scripts": {
    "install-codestandards": [
      "Dealerdirect\\Composer\\Plugin\\Installers\\PHPCodeSniffer\\Plugin::run"
    ],
    "post-install-cmd": ["@install-codestandards"]
  }
}
```

This creates a new section called `scripts` where we instruct `composer` to execute the command to install any coding standard after installing **any** `composer` package.

This might seem like an overkill since it executes the `install-codestandards` script every time we issue a `composer require ...` command, but we're supposed to do that just a couple of times throughout the project configuration.

## Install PHPCS Validators

Now that we have `composer` configured to install and configure any new coding standard, we can start installing them.

We'll be installing the following sniffs:

- PHP Version Compatibility Checks
- Wordpress Compatibility Test
- Empty and unused variables analysis
- Wordpress Coding Standards

So just open up a terminal in the plugin directory and execute the following command:

```bash
composer require --dev 'phpcompatibility/php-compatibility:*' \
  'phpcompatibility/phpcompatibility-wp:*'  \
  'sirbrillig/phpcs-variable-analysis:*' \
  'wp-coding-standards/wpcs:*'
```

And add the following in the **scripts** section on the `composer.json` file:

```json
// composer.json
{
  // ...
  "scripts": {
    // Add this three commands.
    "phpcs": "phpcs",
    "phpcsi": "phpcs -i",
    "phpcbf": "phpcbf"
  }
}
```

To validate that you have installed all the required standards you should execute `phpcs -i` but since we have `phpcs` installed only locally we created the `composer phpcs-i` command. That will list the **locally** installed standards.

```bash
$ composer phpcsi
> phpcs -i
The installed coding standards are PEAR, Zend, PSR2, MySource, Squiz, PSR1, PSR12, PHPCompatibility, PHPCompatibilityParagonieRandomCompat, PHPCompatibilityParagonieSodiumCompat, PHPCompatibilityWP, VariableAnalysis, WordPress, WordPress-Extra, WordPress-Docs and WordPress-Core
```

## Our first test

Lets do a simple test by creating a REALLY BAD php file called `phpcs-test.php`:

```php
// phpcs-test.php

function my_FunctionOne()
{ $a = null;
$b;
    // This is a test
return ""}

```

And in the terminal run `composer phpcs` to verify that its working. You should get something like:

```bash
$ composer phpcs phpcs-test.php
> phpcs 'phpcs-test.php'

FILE: /Users/Mario/Projects/blog-posts/wordpress-phpcs/phpcs-test.php
----------------------------------------------------------------------
FOUND 8 ERRORS AFFECTING 5 LINES
----------------------------------------------------------------------
 2 | ERROR | [ ] Missing file doc comment
 3 | ERROR | [ ] Function name "my_FunctionOne" is prefixed with a
   |       |     package name but does not begin with a capital
   |       |     letter
 3 | ERROR | [ ] Function name "my_FunctionOne" is invalid; consider
   |       |     "My_functionOne" instead
 3 | ERROR | [ ] Missing doc comment for function my_FunctionOne()
 4 | ERROR | [x] Opening brace must be the last content on the line
 5 | ERROR | [x] Line indented incorrectly; expected at least 4
   |       |     spaces, found 0
 7 | ERROR | [x] Line indented incorrectly; expected at least 4
   |       |     spaces, found 0
 7 | ERROR | [x] Closing brace must be on a line by itself
----------------------------------------------------------------------
PHPCBF CAN FIX THE 4 MARKED SNIFF VIOLATIONS AUTOMATICALLY
----------------------------------------------------------------------

Time: 45ms; Memory: 4MB

Script phpcs handling the phpcs event returned with error code 2
```

This confirms that `PHP_CodeSniffer` is working and detecting error on `php` files. But if you are familiar with Wordpress Standards, you can see that the **WordPress Coding Standards** are NOT being checked even though we have them installed.

That's because we still have to tell `PHP_CodeSniffer` to check against WordPress standards.

## Checking and fixing files with bad WordPress standards

To have `composer phpcs` use the WordPress standards, add the following 2 commands to the **scripts** section in the `composer.json` file.

```json
// composer.json
{
  // ...
  "scripts": {
    // ...
    "phpcs-wp": [
      "phpcs --standard=WordPress,WordPress-Extra,WordPress-Docs,WordPress-Core"
    ],
    "phpcbf-wp": [
      "phpcbf --standard=WordPress,WordPress-Extra,WordPress-Docs,WordPress-Core"
    ]
  }
}
```

And execute `composer phpcs-wp phpcs-test.php` to make the check but using WordPress standards

```bash
$ composer phpcs-wp phpcs-test.php
> phpcs --standard=WordPress,WordPress-Extra,WordPress-Docs,WordPress-Core 'phpcs-test.php'

FILE: /Users/Mario/Projects/blog-posts/wordpress-phpcs/phpcs-test.php
----------------------------------------------------------------------
FOUND 12 ERRORS AFFECTING 6 LINES
----------------------------------------------------------------------
 1 | ERROR | [ ] Missing file doc comment
 3 | ERROR | [x] Expected exactly one space between closing
   |       |     parenthesis and opening control structure; "
   |       |     " found.
 3 | ERROR | [ ] Function name "my_FunctionOne" is not in snake case
   |       |     format, try "my_function_one"
 3 | ERROR | [ ] Missing doc comment for function my_FunctionOne()
 4 | ERROR | [x] Opening brace should be on the same line as the
   |       |     declaration
 4 | ERROR | [x] Opening brace must be the last content on the line
 5 | ERROR | [x] Line indented incorrectly; expected at least 1 tabs,
   |       |     found 0
 6 | ERROR | [x] Tabs must be used to indent lines; spaces are not
   |       |     allowed
 6 | ERROR | [ ] Inline comments must end in full-stops, exclamation
   |       |     marks, or question marks
 7 | ERROR | [x] Line indented incorrectly; expected at least 1 tabs,
   |       |     found 0
 7 | ERROR | [ ] PHP syntax error: syntax error, unexpected '}',
   |       |     expecting ';'
 7 | ERROR | [x] String "" does not require double quotes; use single
   |       |     quotes instead
----------------------------------------------------------------------
PHPCBF CAN FIX THE 7 MARKED SNIFF VIOLATIONS AUTOMATICALLY
----------------------------------------------------------------------

Time: 207ms; Memory: 8MB

Script phpcs --standard=WordPress,WordPress-Extra,WordPress-Docs,WordPress-Core handling the phpcs-wp event returned with error code 2
```

NOW we are applying WordPress standards!.

But there are some elements that we're still not validating, like _language namespace_ and the warning of unused variables.

We could add more parameters to the command `phpcs-wp` on the scripts section in `composer.json` file. But that would make it very complex and with way too many parameters, that's why we'll be using a configuration file to tell `PHP_CodeSniffer` ALL the checks and ignores.

## PHPCS configuration using xml file

`PHP_CodeSniffer` can be configured by creating a `phpcs.xml.dist` file in the root of our project.

Among other things, this file tells `phpcs` which checks to perform, which files to check, what languages to check, how fast the checks should be performed, which directories to ignore, etc.

To be sincere, this file is kind of complex and deserves its own blog article to explain. So for now I'll just say that the following `phpcs.xml.dist` file will check to following:

- Verifies that we're using Wordpress >= 5.1
- Verifies that our PHP is at least supported by version 7.0.
- That the text domain is `text-domain`
- All files to verify are in `/app` and `plugin-start-file.php`
- Ignores everything in `/docker`, `/vendor`, `/test`, `/node_modules`
- **Verifies that we're using WordPress coding standards**

So take the following code and save it in a file called `phpcs.xml.dist`

```xml
<!-- phpcs.xml.dist -->
<?xml version="1.0"?>
<ruleset name="Wordpress Plugin">
  <config name="minimum_supported_wp_version" value="5.1" />
  <config name="testVersion" value="7.0-"/>

  <rule ref="PHPCompatibilityWP"/>
  <rule ref="WordPress-Core">
    <!-- a couple of excldes since I dont want any issues with composer packages -->
    <exclude name="WordPress.Files.FileName.NotHyphenatedLowercase" />
    <exclude name="WordPress.Files.FileName.InvalidClassFileName" />
  </rule>
  <rule ref="WordPress-Docs" />
  <rule ref="WordPress-Extra" />
  <rule ref="VariableAnalysis" />
  <rule ref="WordPress.WP.I18n">
    <properties>
      <!-- CONFIGURE HERE YOUR text-domain -->
      <property name="text_domain" type="array" value="text-domain" />
    </properties>
	</rule>
  <rule ref="Squiz.PHP.CommentedOutCode.Found">
    <severity>0</severity>
  </rule>

  <!-- CONFIGURE HERE THE PATHS YOU WANT TO CHECK -->
  <file>plugin-start-file.php</file>
  <file>app/</file>

  <!-- Show sniff codes in all reports -->
  <arg value="sp"/> <!-- Show sniff and progress -->
  <arg name="parallel" value="8"/> <!-- Enables parallel processing when available for faster results. -->
  <arg name="colors"/>
  <arg name="extensions" value="php"/>

  <!-- Configure here the paths you want to IGNORE -->
  <exclude-pattern>/docker/*</exclude-pattern>
  <exclude-pattern>/node_modules/*</exclude-pattern>
  <exclude-pattern>/tests/*</exclude-pattern>
  <exclude-pattern>/vendor/*</exclude-pattern>
</ruleset>
```

Now you can execute `composer phpcs` without any arguments and it will validate against Wordpress and any additional rule you've configured

> Don't forget to change the paths and the text-domain first... Otherwise you'll get errors.

## Visual Studio Code

Up until now, all works on the terminal. But is very probable that you are using _Visual Studio Code_ to create you new amazing plugin.

So lets configure [Visual Studio Code](https://code.visualstudio.com/) so the code validation is done automatically for us. For that we'll be installing a couple of extensions and creating a workspace configuration file.

There are a couple of extensions that work with `phpcs` but at the time of this writing the most updated one was `wongjn.php-sniffer` which can be installed with the following command:

```bash
code --install-extension wongjn.php-sniffer
```

And since you are using a locally installed `phpcs` you should make the following configuration in _Visual Studio Code_ by editing the file `.vscode/settings.json` and adding the following:

```json
// .vscode/settings.json
{
  "[php]": {
    "editor.defaultFormatter": "wongjn.php-sniffer"
  },
  "phpSniffer.executablesFolder": "vendor/bin/"
}
```

Now, you can use the _Format Document_ command ( `⇧⌥F` in Mac) to instantly format any php file.

## Starter Project

Since this are too many files to take care of, and many commands just to start a project, I've created a [Wordpress Plugin Starter](https://github.com/marioy47/wordpress-plugin-starter) project in **GitHub** that you can grab to start you own project with `PHP_CodeSniffer` enabled.
