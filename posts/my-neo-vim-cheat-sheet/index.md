---
title: My (Neo)Vim Cheat Sheet
date: 2020-05-30
tags: vim, neovim, php, python, node
---

# My (Neo)Vim Cheat Sheet

I love _Vim_ because I can do everything with the keyboard.

The downside, is that _you have to do everything with the keyboard_.

In case you didn't understand, the real problem is that you have to memorize a bunch of commands and key combinations to to do things like delete a line in the current text or how to format the current buffer.

To aid myself on memorizing this commands I created this cheat sheet. So this is **my** cheat sheet that works only with [my configuration](https://github.com/marioy47/dotfiles/blob/master/.vimrc)

There is an upside though: I try to use the default key bindings, commands and settings as much as I can.

So this cheat sheet still be useful to you in case you want to create you own.

Now, this are some vim commands that I keep here as reference. There are some that are very basic (from when I was starting with Vim) and some that are somewhat advanced.

## Basic movements and edit

All this a commands are for **normal** mode:

| Command | Action                               |
| ------- | ------------------------------------ |
| jkhl    | Move Down, Up, Left, Right           |
| w       | Beginning of the next word           |
| b       | Beginning of the previews word       |
| e       | End of the next word                 |
| i       | Insert text                          |
| a       | Add text after the current character |
| A       | Add text at the end of the line      |

## Advanced movement command

All this commands are for **normal** mode:

| Command | Action                                                            |
| ------- | ----------------------------------------------------------------- |
| gg      | Go to beginning of file                                           |
| G       | Go to end of file                                                 |
| gd      | Go to _definition_ of word or function in current file            |
| gf      | To to _definition_ in other file                                  |
| 16G     | Go to line 16                                                     |
| `<C-o>` | Previous position or previous buffer (useful when using gd or gf) |
| `<C-i>` | Next position or next buffer                                      |
| $       | End of line                                                       |

## Delete Undo/Redo

All this a commands are for **normal** mode:

| Command | Action                      |
| ------- | --------------------------- |
| x       | Remove character            |
| dw      | Delete word                 |
| dd      | Delete line                 |
| d$      | Delete to end of line       |
| de      | Delete to end of word       |
| d^      | Delete to beginning         |
| d0      | Delete to the beginning too |
| db      | Delete back                 |
| u       | Undo                        |
| `<C-r>` | Redo                        |

## Repeat

Most commands, when preceded by a number, are executed multiple times:

| Command | Action                    |
| ------- | ------------------------- |
| 6dw     | Delete next 6 words       |
| 6dd     | Delete next 6 lines       |
| 6dfx    | Delete until the next `x` |

## Clipboard

| Command | Action           |
| ------- | ---------------- |
| yw      | Copy (Yank) word |
| p       | Paste it         |
| dd      | Delete line      |
| O       | Paste over       |
| P       | Paste under      |

- The last 2 command work to add a new line before or after the curent line if you haven't yanked anything yet

## Changes

| Command | Action                                         |
| ------- | ---------------------------------------------- |
| r       | Replace current character                      |
| ciw     | Change word no matter the position in the word |

## Search

| Command | Action          |
| ------- | --------------- |
| /       | Search          |
| n       | Next result     |
| N       | Previous result |

## Search & Replace

| Command               | Action                                         |
| --------------------- | ---------------------------------------------- |
| `:%s/original/new/gc` | Search in all document asking if do the change |

## Visual

| Command | Action                                                  |
| ------- | ------------------------------------------------------- |
| v       | **Start** the visual (Use jkhl to move the selection)   |
| V       | Visual the complete line (Use jk to move the selection) |

## Debug utilities

| Command             | Action                             |
| ------------------- | ---------------------------------- |
| :verbose imap <tab> | Find if the <tab> key is defined   |
| :verbose imap <C-p> | Find if the <ctrl>p key is defined |

## NERDTree Commands

This commands are to be in **normal** or **insert** mode.

| Command            | Action                                          |
| ------------------ | ----------------------------------------------- |
| `<C-k><C-p>`       | Toggle NERDTree (open if closed, close if open) |
| `<C-k><C-f>`       | Toggle NERDTree and select the current file     |

This commands are to be executed while inside the NERDTree sidebar.

| Command | Action       |
| ------- | ------------ |
| s       | Open on left |
| vs      | Open on top  |

## CoC commands

This commands assume you used the [example configuration](https://github.com/neoclide/coc.nvim#example-vim-configuration) sugested by the [CoC github page](https://github.com/neoclide/coc.nvim)

| Command                | Action                       |
| ---------------------- | ---------------------------- |
| :Format                | Code beautify                |
| :CocConfig             | Open the configuration file  |
| :CocInsta <plugin name>| Insall a new CoC plugin      |

## ALE Commands

| Command | Action                                                  |
| ------- | ------------------------------------------------------- |
| :ALEFix | Format the current document with the configurated fixer |
| :copen  | Open error list                                         |
| :cclose | Close error list                                        |
| :cnext  | Go to next error                                        |

## FZF Commands

Its really helpful to use `:help fzf-vim-comands` to browse the [documentation](https://github.com/junegunn/fzf.vim/blob/master/doc/fzf-vim.txt)

| Command   | Action                                             |
| --------- | -------------------------------------------------- |
| :History  | Opens up the list of last edited files             |
| :GFiles   | Igonres files in gitignore                         |
| :Tags     | Tags in the project                                |
| :Snippets | UtilSnips snippets                                 |
| :BCommits | Commits for the current buffer (Requires Fugitive) |

- Most commands support CTRL-T / CTRL-X / CTRL-V key bindings to open in a new
  tab, a new split, or in a new vertical split
