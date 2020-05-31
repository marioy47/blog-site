---
title: Vim setup for Web Development - Php, JavaScript, (S)CSS, JXS, WordPress, Python
date: 2020-05-25
tags: vim, wordpress, php, neovim, node, coc
cover: vim-web-developmet-cover.png
---

# Vim setup for Web Development: Php, WordPress, JavaScript, JXS, (S)CSS, Python and Flutter.

If you've read some of my blog posts, you can see that PHP and WordPress are a big part of my day to day... But I love vim.

I say "but" because there is a problem: Even though PHP is still one of the [most popular languages](https://octoverse.github.com/#top-languages) around, the tooling is not up to par with the likes of JavaScript, TypeScript or Python. At least not when it comes to open tools like Visual Studio or (NEO)VIM.

So if you want a decent PHP editor that does everything, you better be prepared to spend some dough... or read this article where I'll teach you how to setup your (Neo)Vim to work much like and IDE like Visual Studio or PhpStorm.

And while I'm at it. I'm going to make it work also for other languages like JavaScript, Dart and Python.

## Disclaimer

This article is not for Vim beginners. I assume that you know where your `.vimrc` for `init.vim` file resides. Also how to use (Neo)Vim _plugin managers_ and how to save and quit from Vim.

## Install required software

Since we're going to be starting from scratch, I'm only going to assume that you have access to the terminal in your Linux or Mac.

So Just install the following pieces of software

- NeoVim  or Vim 8 
- Node 10
- git
- curl

![Install required packages](brew-install-packages.png)

As you can see, I'm using brew in MacOS to speed up my installation. But you can install it in the traditional way.

## Basic Vim configuration

Vim is powerful, _very very_ powerful, there is no doubt about that. But the fact is that after installation, vim it's kind of a dumb editor. It doesn't have any _code highlighting_, nor any file management. And the help is kind of hard to reach. But there is a reason for that. Vim expects that you configure it to make it you own.

So, to configure `vim` you have to create a configuration file in you home directory that can be `~/.vimrc` if you are using Vim or `~/.config/nvim/init.vim` if you are using NeoVim...

But just to be sure that we're not making any mistakes, and also that this configuration file works for both _Vim 8_ and _NeoVim_ we're going to use the temporary file `config.vim` in a custom directory:

**And here is the trick**: We're going to instruct _vim_ to use that file as a configuration file and edit it by using the command `vim -u config.vim config.vim`

![Create empty configuration file](touch-config.png)

Now, lets open this file with with _our trick_ and add the following directives:

```vim
" config.vim

let mapleader = ","

set nocompatible
set number                " Show numbers on the left
set hlsearch              " Highlight search results
set ignorecase            " Search ingnoring case
set smartcase             " Do not ignore case if the search patter has uppercase
set noerrorbells          " I hate bells
set tabstop=4             " Tab size of 4 spaces
set softtabstop=4         " On insert use 4 spaces for tab
set shiftwidth=4
set expandtab             " Use apropiate number of spaces
set nowrap                " Wrapping sucks (except on markdown)
autocmd BufRead,BufNewFile *.md setlocal wrap " DO wrap on markdown files
set noswapfile            " Do not leve any backup files
set mouse=a               " Enable mouse on all modes
set clipboard=unnamed     " Use the OS keyboard
set showmatch

" Keep VisualMode after indent with > or <
vmap < <gv
vmap > >gv

" Move Visual blocks with J an K
vnoremap J :m '>+1<CR>gv=gv
vnoremap K :m '<-2<CR>gv=gv
```

You can read the comments if you want to know exactly what I'm doing here. But the summary is that I'm making sure of 2 things:

- That `vim` (Vim 8) and `nvim` (Neovim) work **almost** exactly the same
- That the editor will behave more like an IDE which is the hole reason for this post

Notice that I said _almost_ and not **exactly** the same. And the reason for that is that there are plugins that will help us achieve that similarity and I don't what to repeat directives.

Now, here is the second trick. _Save and re-source the current file to make the new configuration take effect_

- First save with `:w`
- The re-source the current file with `:source %`

And you'll get something like this:

![Vim first run for the configuration](config-vim-first.png)

We're still a long way to go, but we made some good progress.

## Install a Plugin Manager

One thing that I didn't mention before, is that `vim's` config file is actually written in `vimscript`, which is a complete programming language. So we could make vim behave like an IDE by adding functions and directives in this file. The problem is that it would take too long to do it and we would en up with a configuration file with a size that could be measured in Megs. That's why we'll be using plugins.

In our case, we're going to use the [vim-plug](https://github.com/junegunn/vim-plug) plugin manager to take care of downloading installing and configuring the plugins we're going to use.

So add the following to the `config.vim` file at the end:

```vim
" Install vim-plug for vim and neovim
if empty(glob('~/.vim/autoload/plug.vim'))
  silent !curl -fLo ~/.vim/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
  silent !mkdir -p ~/.config/nvim/autoload/ && ln -s ~/.vim/autoload/plug.vim ~/.config/nvim/autoload/
  autocmd VimEnter * PlugInstall --sync | source $MYVIMRC
endif

" Plugins
call plug#begin('~/.vim/plugged')
" Plugins here !!!!
call plug#end()
```

Now, save and re-source this file with `:w` and then `:source %` to make the changes take effect.

![Source the configuration file after vim-plug addition](source-after-vim-plug.png)

Did you get that "download progress"??? That's what this new directives do. Download the _vim-plug_ plugin manager into `./.vim/autoload/plug.vim` file.

**At this point, its better to exit vim and re-open it with `vim -u config.vim config.vim` since there are some directives that only take effect at start up.**

We should have some syntax highlight now:

![Syntax highlight](syntax-hightlight.png)

## Our first plugin

Remember that I said that the configuration we added was to make `vim` and `nvim` **almost** exactly the same?

We'll the reason for not making the **exactly** the same at that point, was because there is a plugin that will help us with that.

The plugin is called [`tpope/vim-sensible`](https://github.com/tpope/vim-sensible) and what it does is that configures our vim editor with some "sensible" defaults.

To install the plugin lets make the following change at the end of the `config.vim` file:

```vim {4}
" config.vim

call plug#begin('~/.vim/plugged')
Plug 'tpope/vim-sensible'         " Sensible defaults
call plug#end()
```

We just added our first plugin but we still need to install it.

When installing plugins, our _trick_ has a little change:

- Save the file with `:w`
- Execute `:source %` to re-source
- **Execute `:PlugInstall` to install the new plugin**
- Close the _Install Progress Buffer_ with `:bd`

The `PluginInstall` command is courtesy of the `vim-plug` plugin manager, and what it does it that downloads and install any uninstalled plugin.

![First plugin installation](plug-install.png)

And notice the change... Now we have an Status Bar at the bottom!!!.

That plugin adds some additional functionality, that can be reviewed by looking ant the short [source code](https://github.com/tpope/vim-sensible/blob/master/plugin/sensible.vim) including new shorthand commands and some behavioral changes that makes our `vim` more usable.

## Themes

What is an IDE without out some pretty colors??? 😅

In vim themes are also plugins. So we are going to add 3 new plugins:

- Material _Palenight_
- _Gruvbox_
- Night Owl

> I like to switch theme according to the time of day, or the language I'm programing on. That's why I use 3 themes

To install them, make the following changes on `config.vim` in the plugins section:

```vim {7-9,13}
" config.vim

call plug#begin('~/.vim/plugged')

Plug 'tpope/vim-sensible'         " Sensible defaults

Plug 'kaicataldo/material.vim'    " Material themes
Plug 'morhetz/gruvbox'            " Retro colors theme
Plug 'haishanh/night-owl.vim'     " A 'night friendly` theme

call plug#end()

colorscheme material              " Activate the Material theme
```

Again:

- Save the file with `:w`
- Re-source it with `:source %`
- Install the plugins with `:PlugInstall`
- Close the _install buffer_ with `:bd`
- Re-source (for the second time) the config with `:source %`

![Install themes plugin](plug-install-themes.png)

And you'll see a new set of colors:

![Material Theme](colorscheme-material.png)

Each of the themes have additional options that you can configure in the `config.vim` file. Options like support for italics, different versions of the theme, _light_ versions, etc.

- Options for the [Material theme](https://github.com/kaicataldo/material.vim#usage)
- Options for [Gruvbox](https://github.com/morhetz/gruvbox/wiki/Configuration)
- Options for [Nigh Owl](https://github.com/haishanh/night-owl.vim#usage)

### Fix italic issue

Material and Gruvbox have options to enable _italics_ and true color that can have issues with Vim8 (I haven't had any issues with NeoVim).

Most of this issues are [related to the terminal](https://gist.github.com/XVilka/8346728) and not so much with the editor.

The only solution that worked for me, was to create the file `xterm-256color-italic.terminfo` with the contents:

```
xterm-256color-italic|xterm with 256 colors and italic,
  sitm=\E[3m, ritm=\E[23m,
  use=xterm-256color,
```

Then source it with the `tic` command:

```bash
tic -c xterm-256color-italic.terminfo
```

Also, I needed to create an alias for `vim` so every time I executed `vim` it first instructed the terminal to use the new _terminfo_:

```bash
alias vim="TERM=xterm-256color-italic vim"
```

But as I said, with NeoVim I haven't had any issues.

## File management

One essential part of an IDE, it's file management... preferably by using some kind of sidebar that shows the project's files. And to complement that, it would be nice to have some kind of _fuzzy file opener_ that lets you open a file just by typing part of the name. Much like `Cmd-P` in Visual Studio Code.

It turns out that there are also plugins for that!.

We'll install [`NERDTree`](https://github.com/preservim/nerdtree) for file exploring and [`fzf`](https://github.com/junegunn/fzf.vim) for fuzzy file finding (think Cmd-p open file):

So lets add the following lines to the `config.vim` file:

```vim {11-13,19-21}
" config.vim

call plug#begin('~/.vim/plugged')

Plug 'tpope/vim-sensible'         " Sensible defaults

Plug 'kaicataldo/material.vim'    " Material themes
Plug 'morhetz/gruvbox'            " Retro colors theme
Plug 'haishanh/night-owl.vim'     " A 'night friendly` theme

Plug 'scrooloose/nerdtree', { 'on':  'NERDTreeToggle' }           " File navigator
Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' } " Install fuzzy finder binary
Plug 'junegunn/fzf.vim'           " Enable fuzzy finder in Vim

call plug#end()

colorscheme material                    " Activate the Material theme

noremap <C-k><C-p> :NERDTreeToggle<cr> " Use Ctrl-K Ctrl-P to open a sidebar with the list of files

nnoremap <C-p> :Files<cr>              " Use Ctrl-P to open the fuzzy file opener
```

The reason that _fzf_ requires 2 plugins is because the first installs the `fzf` binary in our file system, and the second is the actual vim plugin.

Again, save the file with `:w`, re-source the file with `:source %` and install the plugins with `:PlugInstall`. Finally re-source again to enable the new plugins in our current vim instance.

![Install NERD Tree](plug-install-nerdtree.png)

Now, when you type `Ctrl-K` and then `Ctrl-P` you'll get a tree view of the files of the current directory.

![NERDTree](nerdtree.png)

And when you type `Ctrl-P` you'll get a file finder at the bottom of the terminal, where you find files by just typing part of the name:

![Ctrl-P](fzf-ctrl-p.png)

Both NERDTree and FZF are pretty configurable. I encourage you to read [this article](https://medium.com/@victormours/a-better-nerdtree-setup-3d3921abc0b9) for additional options for NERDTree

The FZF [GitHub Page](https://github.com/junegunn/fzf.vim) its pretty good. But you might want to take a look at this [blog post](https://blog.avahe.tk/posts/neovim/fzf-ripgrep/) for additional information on how **also** fuzzy find inside files using [RipGrep](https://github.com/BurntSushi/ripgrep).

## IntelliSense

Now the interesting part, _Code Completion_ and _Intellisense_.

The project [Conquer of Completion](https://github.com/neoclide/coc.nvim) (or **CoC**) it's a very big Vim plugin that brings [Language Server Protocol](https://langserver.org/) over to Vim.

If you are not familiar with LSP, then let me explain.

Upon the development of [Visual Studio Code](https://code.visualstudio.com), Microsoft decided to extract the language analysis and completition functions of their IDE in it's own "server". That way, multiple projects (like vim) could use and contribute to development of code analysis.

Even tough the LSP server is an standard more than an application, the only useful implementation of it is written in node, and that's why we need [Node JS](https://nodejs.org) installed on our machine. To use the code competition offered by CoC.

So, to enable CoC on vim we need to add the following line to the plugins section in our `config.vim` file:

```vim {15}
" config.vim

call plug#begin('~/.vim/plugged')

Plug 'tpope/vim-sensible'         " Sensible defaults

Plug 'kaicataldo/material.vim'    " Material themes
Plug 'morhetz/gruvbox'            " Retro colors theme
Plug 'haishanh/night-owl.vim'     " A 'night friendly` theme

Plug 'scrooloose/nerdtree', { 'on':  'NERDTreeToggle' }           " File navigator
Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' } " Install fuzzy finder binary
Plug 'junegunn/fzf.vim'           " Enable fuzzy finder in Vim

Plug 'neoclide/coc.nvim', {'branch': 'release'} " Intelisense

call plug#end()
```

But wait!!! we're not finished. The CoC plugins has a big set of commands that are not configured by default **and that you need to setup by yourself**.

Instead of showing you here what additional configuration you should add to de `config.vim` file. I think its better you head over to the CoC [configuration documentation](https://github.com/neoclide/coc.nvim#example-vim-configuration) and _Copy & Paste_ what's there.

> As the GitHub page says. That's an "example" configuration. But I always use whats there without any changes.

So add the CoC configuration at the end of `config.vim` file. Then write the changes with `:w`, then `:source %` so it recognizes the new plugin. Then then `:PlugInstall` to install it and finally `:source %` again to have _Intellisense_.

![Install Coc](install-coc.png)

And test the _Intellisense_ just by typing something:

![IntelliSense in action](vim-intellisense-in-action.png)

Cool, isn't it?

### CoC extensions

CoC by itself is very capable, but it does just auto suggest competition for only a small set of languages. Which is pretty normal since there number of available programming languages its very big.

Fortunately, CoC supports extensions that add support to additional languages (intellisense for additional languages) and also extensions that adds additional behavior like markdown linting and even discord connections.

You install _CoC extensions_ by By using the `:CocInstall <extension-name>` command inside vim.

![CocInstall phpls](coc-install-phpls.png)

Here I'm installing the `coc-phpls` extension to have PHP code competition.

To have CoC install extensions automatically you have to set up the `coc_global_extensions` variable inside the `config.vim` file, with a list of _CoC_ extensions you want to install at **start up time**.

So lets add some extensions by adding the following directive to your `config.vim` file and **restarting vim**:

```vim
let g:coc_global_extensions = [
    \ 'coc-tsserver',
    \ 'coc-json',
    \ 'coc-html',
    \ 'coc-css',
    \ 'coc-phpls',
    \ 'coc-python'
    \]
```

This will install the `tsserver` (for javascript), `json`, `html`, `css`, `php` and `python` extensions

If you require support for additional languages, just take a look at the available [list of extensions](https://github.com/neoclide/coc.nvim/wiki/Using-coc-extensions#implemented-coc-extensions)

## Linting

If you tested CoC, you can see that its capable of detecting syntax and format errors, which is awesome.

The problem is that if you already use something like `eslint` for your JavaScript projects, or `phpcs` for your PHP projects, then you might be getting warnings of _linting_ errors when you know that there are none.

In my case, when I'm developing for WordPress, the `coc-phpls` extension keeps warning me that I'm using _tabs_ instead of _spaces_ in my code. Which is a nightmare.

That's why we need our last plugin: [Ale](https://github.com/dense-analysis/ale).

**Ale** allows you to configure any linter we want. For instance you could be using `phpcs` for your PHP projects, or `pylint` and/or `flake8` for your Python projects.

Since we already have _CoC_ installed, we need to do 2 things:

- Install the _Ale_ plugin with `vim-plug`
- Tell _CoC_ to use Ale for linting

So lets add the plugin in the plugins section first:

```vim{15}
" config.vim
call plug#begin('~/.vim/plugged')

Plug 'tpope/vim-sensible'         " Sensible defaults

Plug 'kaicataldo/material.vim'    " Material themes
Plug 'morhetz/gruvbox'            " Retro colors theme
Plug 'haishanh/night-owl.vim'     " A 'night friendly` theme

Plug 'scrooloose/nerdtree', { 'on':  'NERDTreeToggle' }           " File navigator
Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' } " Install fuzzy finder binary
Plug 'junegunn/fzf.vim'           " Enable fuzzy finder in Vim

Plug 'neoclide/coc.nvim', { 'branch': 'release' } " Intelisense
Plug 'dense-analysis/ale'         " Code linting

call plug#end()
```

Then we have to tell _CoC_ to use _Ale_ instead of any extensions when it comes to linting. For that you have to execute `:CocConfig`. That opens up the `coc-settings.json` file for you.

![CoC config for Ale](coc-settings-for-ale.png)

There you have to add the folloing lines:

```json
{
  "diagnostic.displayByAle": true
}
```

And that's it...

Now lets make a little test with a php file:

- Install composer in the directory you are working
- Create a PHP file with wrong format
- Fix the format using ALE

```bash
composer init
composer require "squizlabs/php_codesniffer=*" --dev
vim hello.php
```

Make a bad formatted file with vim and look at the errors:

![ALE Linting Errors](ale-linting-errors.png)

Notice that you have still have to configure the linting tool for your projects, but as far as Vim is concerned, that's it.

## Install your configuration file

Up until now we've been using a "temporary" config file (that's why we used the `vim -u config.vim config.vim` command) so its easier to modify and keep as a separate project. But now that we have all the settings that we want we can install it so it get auto loaded by Vim8 and Neo vim

### Vim

To have this file be read every time you start Vim, you just have to copy it to your home directory with the name `.vimrc`

```bash
cp config.vim ~/.vimrc
```

### NeoVim

For Neo Vim we are going to use a little tric (looks like we're full of trick here !!!)

Lest instruct _NeoVim_ to use _Vim's_ file. For that you have to create a file in `.config/nvim/init.vim` with the followin content:

```vim
set runtimepath^=~/.vim runtimepath+=~/.vim/after
let &packpath=&runtimepath
source ~/.vimrc
```

```bash
mkdir -p ~/.config/nvim/
cp config.vim ~/.config/nvim/init.vim
```

By adding this to `init.vim` you are telling NeoVim to look for configuration settings int `~/.vimrc` and use  the `~/.vim/autoload` directory for plugin storage.

And we're done.

## Final thougts

I've created Git repo for testing my `.vimrc` file in [GitHub](https://marioyepes.com/vim-setup-for-modern-web-development/). You can take a look there to the final result.

Also, if you want to browse my current `.vimrc` file, you can browse it in [my dotfiles repo](https://github.com/marioy47/dotfiles/)

