---
title: Python Cheat Sheets (Python, Django, Pipenv)
date: 2020-08-10
cover: ./Python-Logo-PNG-Image.png
tags: [ python, django, pandas, flask ]
---

# Python Cheat Sheets (Python, Django, Pipenv)

In this article I'll be posting a series of code snippets, gotchas and syntax description for Python and some of its notable projects like Django, Flask, Pandas, Numpy, etc.

The idea is to have a single stop resource for those obscure and sometimes forgettable snippets that you need in your Python projects.

Depending on your level of experience, some of this snips will be too basic or to complex for you.

## TOC

```toc

```

## Python

A more complete [PDF](https://github.com/ehmatthes/pcc/releases/download/v1.0.0/beginners_python_cheat_sheet_pcc_all.pdf) version can be found in the [Python Crash Course Site](https://ehmatthes.github.io/pcc/).

### Python Variables

| Syntax              | Comments                                          |
| ------------------- | ------------------------------------------------- |
| `True` `False`      | Contrary to other languages, they are capitalized |
| `"string" 'string'` | Both quotes are valid                             |
| `a,b = b,a`         | Variable swap                                     |

### Adding comments in python

| Syntax  | Notes                                                                                               |
| ------- | --------------------------------------------------------------------------------------------------- |
| `# ...` | Pound sign comment a line                                                                           |
| `"""`   | Triple quotes allow you to comment a function or class when placed _After_ the function declaration |

### Input from the console

| Syntax    | Notes                                                                                         |
| --------- | --------------------------------------------------------------------------------------------- |
| `input()` | Receives input from the console. You can pass a string as parameter as a label on the console |

### Python strings

| Syntax                    | Comments                                                                |
| ------------------------- | ----------------------------------------------------------------------- |
| `hello = """ ... """`     | Triple quotes allow you to create a **multiline** string                |
| `f'Hello {name}'`         | Allows you to pass the variable `name` to the string and have it parsed |
| `mystr.title()`           | Capitalizes every word of a string                                      |
| `mystr.find('str')`       | Returns the index where `str` is in `mystr`                             |
| `mystr.replace('a', 'b')` | Replaces `a` to `b` in a string                                         |
| `'Name' in mystr`         | Returns `True` if `Name` is the string `mystr`                          |

### Basic python arithmetic

| Operand  | Notes                   |
| -------- | ----------------------- |
| `//`     | Returns an `int`        |
| `x ** y` | `x` to the power of `y` |
| `x += 1` | Increment by `1`        |

### Loops in python

| Example                     | Notes                                 |
| --------------------------- | ------------------------------------- |
| `for i in my_list:`         | Loop trough each item of a list       |
| `for i in range(1, 12, 3):` | Loop from 1 to 12 on an interval of 3 |

### Python lists

| Method                                | Notes                                                         |
| ------------------------------------- | ------------------------------------------------------------- |
| `.pop()`                              | Removes the last item                                         |
| `.clear()`                            | Empties the list                                              |
| `",".join(mylist)`                    | Creates a string separated by `,`                             |
| `.index('str')`                       | Returns the index of the first occurrence of `str`            |
| `.copy()`                             | Returns a copy of the list. Useful for functional programming |
| `mylist[:]`                           | Returns a copy of the list (like above)                       |
| `mylist[:2]`                          | Returns from the start of the list to the 2nd item            |
| `mylist[::-1]`                        | Reverse a list or string                                      |
| `[x**2 for x in range(2,8)]`          | List comprehension                                            |
| `[x**2 for x in range(2,8) if x % 2]` | List comprehension with conditional                           |

### Dictionaries in Python

| Method                              | Notes                                                                        |
| ----------------------------------- | ---------------------------------------------------------------------------- |
| `mydict.get('invalidx', 'default')` | Return the value of `mydict['invalidx']` if exits. If not, returns `default` |
| `for key in my_dict.keys():`        | Loop trough a dictionary keys                                                |
| `for key, val in my_dict.values():` | Loop trough a dictionary values                                              |
| `for key, val in my_dict.items():`  | Loop trough a dictionary                                                     |
| `{**dic1, **dic2}`                  | Merge dictionaries                                                           |

### Exceptions

| Method                    | Notes                                                     |
| ------------------------- | --------------------------------------------------------- |
| `raise Exception("desc")` | Throws a new exception                                    |
| `except Exception as e:`  | Catches the exception in the `e` variable                 |
| `finally:`                | Allows you tu use variables declared in the `try` section |

## Django Cheat Sheet

| Command                                           | Action                                                                       |
| ------------------------------------------------- | ---------------------------------------------------------------------------- |
| `django-admin startproject <project_name> [path]` | Creates a new project on path (preferably `.`)                               |
| `django-admin startapp <app_name>`                | Creates a new application on `app_name` path                                 |
| `python manage.py runserver 0:8080`               | Starts the development server                                                |
| `python manage.py startapp <appname>`             | Creates a new app in the project                                             |
| `python manage.py makemigrations [appname]`       | Creates the migration **from** the models                                    |
| `python manage.py migrate [appname]`              | Executes the migrations in the database                                      |
| `python manage.py sqlmigrate [appname] [#id]`     | Returns the SQL for the migration specified by `<#id>` and `<appname>`       |
| `python manage.py shell`                          | Creates an interactive shell where you can import models and execute queries |
| `python manage.py createsuperuser`                | Creates a super user                                                         |

## Pipenv Cheat

I've included here a list of useful `pipenv` commands in case you are curious.

| Command                | Action                                                |
| ---------------------- | ----------------------------------------------------- |
| `pipenv --python 3.7`  | Create a project with another Python version          |
| `pipenv install --dev` | Install packages including _dev_ dependencies         |
| `pipenv lock`          | _Burns_ the package versions on `Pipfile.lock` file   |
| `pipenv clean`         | Removes all packages not in `Pipfile.lock`            |
| `pipenv run <command>` | Runs a command using the current virtualenv           |
| `pipenv sync`          | Installs the packages from `Pipfile.lock`             |
| `pipenv uninstall`     | Removes a package from the env and from the `Pipfile` |
| `pipenv --where`       | Locates the project                                   |
| `pipenv --system`      | Install the packages system wide and not in a venv    |
| `pipenv --rm`          | Remove the current virtual environment                |
| `pipenv --venv`        | Locates the virtual environment                       |
| `pipenv ---py`         | Locates the Python interpreter                        |

## Final notes

You can access [additional](https://sinxloud.com/python-cheat-sheet-beginner-advanced/) Python Cheat Sheets in the [SinxLooud](https://sinxloud.com/) site
