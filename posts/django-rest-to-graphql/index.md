---
title: Django, Docker, RestAPI, JWT = Bliss
date: 2022-01-01
cover: Best-Django-Python-CMS-2015.png
tags: python, django, pipenv, docker, jwt, rest
---

# Django, Docker, RestAPI, JWT = Bliss
## Create the first application

Up until now, we created a Django project that doesn't do much since we haven't created our first app. If you want to understand why there are projects and file, I recommend you read [this blog article](https://vegibit.com/django-app-vs-project/).

To create our first app, issue:

```bash
django-admin startapp blog
```

And add it to the `config/settings.py` file in the `INSTALLED_APPS` section:

```python
# config/settings.py
# ...
INSTALLED_APPS = [
    # ...
    'blog' # Add this line
]
# ...
```

**You can remove the 2 new lines before continuing**

### Create the first view

Configure Django so it reads `blog/urls.py` as an **additional** routes file.

```python {3,7}
# config/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('blog/', include('blog.urls')),
]
```

Now, lets create the `blog/urls.py` file with the blog routes:

```python {3,6}
# blog/urls.py
from django.urls import path
from .views import home

urlpatterns = [
    path('', home)
]
```

Create the `home` function you are supposed to call when the new route is accessed:

```python {3,5-7}
# blog/views.py
from django.shortcuts import render
from django.http import HttpResponse

def home(request):
    if request.method == 'GET':
        return HttpResponse('GET response from Home view')
    if request.method == 'POST':
        return HttpResponse('POST response from Home view')
```

Visit `http://localhost:8080/blog` to access the new route

> We'll test the POST request latter

## Convert the _function based view_ to a _class based view_

Even tough _function based views_ allow you to manage requests of type `GET`, `POST`, `DELETE`, etc. The code tends to get messy since you have to use a lot of conditionals. That's why we're going to migrate to a _class based views_ system and have cleaner code.

We need then to make 2 changes:

- Replace the `home` function for a class with the `Home::get` and `Home::post` methods
- Change the `''` route to execute the class instead of a function

```python {4,6-11}
# blog/views.py
from django.shortcuts import render
from django.http import HttpResponse
from django.views import View

class Home(View):
    def get(self, request):
        return HttpResponse('GET response from Home view')

    def post(self, request):
        return HttpResponse('POST response from Home view')
```

Tell the `path` function in `blog/urs.py` that you are using _class based views_.

```python {3,6}
# blog/urls.py
from django.urls import path
from .views import Home

urlpatterns = [
    path('', Home.as_view())
]
```

Test it with curl:

```bash
curl http://locahost:8080/blog/
curl -X POST -I http://localhost:8080/blog/
```

The post request returns a `403 Forbidden` error because Django protects the application to CSRF attack.

To make the test pass, edit **temporally** the `django_blog/settings.py` file and comment the line that says `'django.middleware.csrf.CsrfViewMiddleware',` and execute the curl command again.

> If you omit the `-I` flag, youl'll get the contents of the requests instead of just the headers

## Using templates

- New class in `blog/views.py`
- Add a new route to the new view in `blog/urls.py`
- Create the `blog/templates/articles.html` file
- Pass data to the `render` function in the view
- Use the template language to render the passed data

Create the new class view for the articles:

```python {2,13-15}
# blog/views.py
from django.shortcuts import render
from django.http import HttpResponse
from django.views import View

class Home(View):
    def get(self, request):
        return HttpResponse('GET response from Home view')

    def post(self, request):
        return HttpResponse('POST response from Home view')

class Article(View):
    def get(self, request):
        return render(request, 'articles.html', {})
```

Register the view on `blog/urls.py`:

```python {7}
# blog/urls.py
from django.urls import path
from .views import Home, Article

urlpatterns = [
    path('', Home.as_view()),
    path('articles', Article.as_view())
]
```

Create the template in `blog/tempaltes/articles.html`:

```html
<!-- blog/templates/articles.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title></title>
  </head>
  <body>
    <h1>Articles in our blog</h1>
    <p>lorem ipsum</p>
  </body>
</html>
```

The `articles.html` name must match what is was registered in the `render()` function.

If this step fails. **Review that you added `blog` to the list of applications in `django_blog/settings.py`**

## Pass data to the templates

```python {19}
# blog/views.py
# ...
class Article(View):
    def get(self, request):
        articles = [
            {
                'title': 'My first article',
                'author': 'Mario Yepes',
                'created_at': '2021-01-21',
                'content': 'Lorem ipsum ... '
            },
            {
                'title': 'The second article',
                'author': 'Consuelo Cifuentes',
                'created_at': '2020-12-15',
                'content': 'Lorem ipsum ...'
            }
        ]
        return render(request, 'articles.html', {'articles': articles})
```

```html {11-17}
<!-- blog/templates/articles.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title></title>
  </head>
  <body>
    <h1>Articles in our blog</h1>
    <ul class="articles">
      {% for article in articles %}
      <li class="article">
        <h2>{{ article.title }}</h2>
        <small>{{ article.created_at }} by {{ article.author }}</small>
        <p>{{ article.content }}</p>
      </li>
      {% endfor %}
    </ul>
  </body>
</html>
```


## Create an Articles model

Up until now we've used a dictionary as the source of the articles. Now that we have a database in place, we can migrate from using a dictionary to actually using data in a database.

- Create a model
- Make a migration
- Make a seed

```python {4-8}
# blog/models.py
from django.db import models

class ArticleModel(models.Model):
    title = models.CharField(max_length = 120)
    author = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField()
```

```bash
python manage.py makemigrations
python manage.py migrate
```

This will create the file `blog/migrations/0001_initial.py` and create the new articles table

```bash
psql -U mario -d django_blog -c "select * from blog_article"
```

## Seeding the article table

```bash
pipenv install django-seed
```

```python {5}
# django_blog
INSTALLED_APPS = (
    ...
    'blog',
    'django_seed',
)
```

```bash
python manage.py seed blog --number=12
psql -U mario -d django_blog -c "select * from blog_article"
```

## Retreiving data from the database

Now that we have configured our database connection and we have data inside the `blog_article` table. We can change the view to use the model instead a static object.

```python {3,7}
# blog/views.py
# ...
from blog.models import Article as ArticleModel
# ...
class Article(View):
    def get(self, request):
        articles = ArticleModel.objects.all()
        return render(request, 'articles.html', {'articles': articles})
```

> I imported the model with an alias (`as ArticleModel`) to avoid name coalitions.

## Inserting data using a form

We could modify the `articles.html` and add the html for a insert form. But that would be a waste of time. Django already has a `Form` class that creates forms from the `Article` model.

Create the `blog/forms.py` file

```python
# blog/forms.py
from django.forms import ModelForm
from .models import Article as ArticleModel

class ArticleForm(ModelForm):
    class Meta:
        model = ArticleModel
        fields = ['title', 'author', 'content']
```

Add the class to the model:

```python {3,8,10-11}
# blog/views.py
# ...
from .forms import ArticleForm
# ...
class Article(View):
    def get(self, request):
        articles = ArticleModel.objects.all()
        return render(request, 'articles.html', {'articles': articles, 'form': ArticleForm()})

    def post(self, request):
        return HttpResponse('Post received')
```

Change the `blog/templates/articles.html` to include the form

```html {5-9}
<!-- blog/templates/articles.html -->
<!-- ... -->
<body>
    <h1>Articles in our blog</h1>
    <form method="POST">
        {% csrf_token %}
        {{ form }}
        <input type="submit">
    </form>
<!-- ... -->
</body>
</html>
```

## Insert post data to the database

```python
# blog/views.py
from datetime import datetime
from django.shortcuts import render, redirect
#...
class Article(View):
    # ...
    def post(self, request):
        ArticleModel.objects.create(title=request.POST['title'],
                                    author=request.POST['author'],
                                    content=request.POST['content'],
                                    created_at=datetime.now())
        return redirect('/blog/articles')
```

If the number of fields is too big, its better to use the `ArticleForm`

```python
class Article(View):
    # ...
    def post(self, request):
        form = ArticleForm(request.POST);
        form.instance.created_at = datetime.now()
        form.save()
        return redirect('/blog/articles')

```

## Url parammeters

```python
# blog/views.py
# ...
class ArticleDetails(View):
    def get(self, request, id):
      return HttpResponse('Article details')
```

```python {3,8}
# blog/urls.py
from django.urls import path
from .views import Home, Article, ArticleDetails

urlpatterns = [
    path('', Home.as_view()),
    path('articles', Article.as_view()),
    path('articles/<int:id>', ArticleDetails.as_view())
]
```

Test that you can acces `http://localhost:8080/blog/article/1`

Create the complete request

```python {2,5-11}
# blog/views.py
from django.http import HttpResponse, HttpResponseNotFound
from .models import Article as ArticleModel
# ...
class ArticleDetails(View):
    def get(self, request, id):
        try:
            article = ArticleModel.objects.get(id=id)
            return render(request, 'article.html', { 'article': article })
        except ArticleModel.DoesNotExist:
            return HttpResponseNotFound()
```

Create the template `article.html`

```html
<!-- blog/templates/article.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title></title>
  </head>
  <body>
    <h1>{{ article.title }}</h1>
    <small>{{article.date}} by {{article.author}}</small>
    <p>{{article.content}}</p>
    <a href="/blog/articles">Back to list</a>
  </body>
</html>
```

## Edit articles from the admin interface

Create the super user

```bash
python manage.py createsuperuser
```

Access the `http://localhost:8080/admin` with the created password

Enable the model in `blog/admin.py`

```python {2,4}
# blog/admin.py
from django.contrib import admin
from .models import Article as ArticleModel

admin.site.register(ArticleModel)
```

Test in http://localhost:8080/admin that you can see the articles and they are shown by title.

No change which columns to display on the admin backend we need to change the `admin.site.register` function to a class:

```python {5-7}
# blog/admin.py
from django.contrib import admin
from .models import Article as ArticleModel

@admin.register(ArticleModel)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'created_at']
```

## Creating tests

- Tests class is included
- You create a class that inherits `TestCase` for each group of tests
- All the methods of your class have to start with `test_`

```python {16}
# blog/tests.py
from django.test import TestCase
from .models import Article as ArticleModel
from datetime import datetime
from django.utils import timezone

class ArticleTest(TestCase):
    def test_article_gets_created(self):
        '''Test that an article gets created'''
        now = datetime.now(timezone.utc)
        ArticleModel.objects.create(
            title = 'Created by a test',
            author = 'Test Case',
            content = 'Lorem Ipsum',
            created_at = now)
        article = ArticleModel.objects.get(created_at=now)
        self.assertEqual(article.title, 'Created by a test')

    def test_article_get_listed(self):
        '''Test that the /blog/ url returns html'''
        request = self.client.get('/blog/')
        self.assertEqual(request.content, b'GET response from Home view')
```

> Notice the b'..' in the last assert. The reason is that the request returns binary values so we need to compare agains a "binary string"

You execute the tests by executing

```bash
python manage.py test
```

> Remember to execute `pipenv shell` to start the virtual environment.

## REST Api

```bash
pipenv install djangorestframework
django-admin startapp api
```

Add the Rest Framework to the list of applications

```python
# django_blog/settings.py
# ...
INSTALLED_APPS = [
  # ...
  'api.apps.ApiConfig',
  'rest_framework'
]
# ...
```

Tell django how to handle all urls that start with `api/`.

```python
# django_blog/urls.py
# ...
urlpatterns = [
# ...
  path('api/', include('api.urls'),
]
```

Register our first view.
