---
title: My (Neo)Vim Cheat Sheet
date: 2020-04-30
tags: vim, neovim, php, python, node
cover: vim-cheat-sheet-cover.png
---

# My (Neo)Vim Cheat Sheet

I love _Vim_ because I can do everything with the keyboard. The downside, is that _you have to do everything with the keyboard_.

In case you didn't understand, the real problem is that you have to memorize a bunch of commands and key combinations to to do things like delete a line in the current text or how to format the current buffer.

To aid myself on memorizing this commands I created this cheat sheet that works with **[my configuration](https://github.com/marioy47/dotfiles/blob/master/.vimrc)**.

If you want something more complete, graphical and generic, you can visit the [Graphical vi-vim Cheat Sheet and Tutorial](http://www.viemu.com/a_vi_vim_graphical_cheat_sheet_tutorial.html) site.

One thing tough. I try to use the default key-maps as much as I can, so this cheat sheet might still be useful to you in case you want to create you own.

## Movements and insert

All this a commands are for **normal** mode:

| Command | Action                          |
| ------- | ------------------------------- |
| w       | Beginning of the next word      |
| fx      | Go to forward to the next `x`   |
| b       | Beginning of the previews word  |
| e       | End of the next word            |
| `$`     | End of line                     |
| A       | Add text at the end of the line |

## Advanced movement commands

All this commands are for **normal** mode:

| Command | Action                                                            |
| ------- | ----------------------------------------------------------------- |
| gg      | Go to beginning of file                                           |
| G       | Go to end of file                                                 |
| `<C-f>` | Page Down (Page Forward)                                          |
| `<C-b>` | Page Up (Page Backward)                                           |
| gd      | Go to _definition_ of word or function in current file            |
| gf      | To to _definition_ in other file                                  |
| 16G     | Go to line 16                                                     |
| `<C-o>` | Previous position or previous buffer (useful when using gd or gf) |
| `<C-i>` | Next position or next buffer                                      |

## ViewPort

It's like scrolling but keeping the cursor on the same position

| Command | Action                              |
| ------- | ----------------------------------- |
| `<C-e>` | Move viewport up                    |
| `<C-u>` | Move viewport Up (like page up)     |
| `<C-d>` | Move viewport Down (like page down) |

## Delete Undo/Redo

All this a commands are for **normal** mode:

| Command | Action                              |
| ------- | ----------------------------------  |
| x       | Cut (Works in visual mode too)      |
| de      | Delete to end of word               |
| d0      | Delete to the beginning of the line |
| db      | Delete back                         |
| dfx     | Delete until the next `x`           |
| `:.,$d` | Delete until the end of the buffer  |
| u       | Undo                                |
| `<C-r>` | Redo                                |

## Repeat

Most commands, when preceded by a number, are executed multiple times:

| Command | Action              |
| ------- | ------------------- |
| 6dw     | Delete next 6 words |
| 6dd     | Delete next 6 lines |

## Clipboard

| Command | Action                       |
| ------- | ---------------------------- |
| yw      | Copy (Yank) word             |
| p       | Paste it after the cursor    |
| dd      | Delete line                  |
| O       | Paste over the current line  |
| P       | Paste under the current line |

- The last 2 command work to add a new line before or after the current line if you haven't yanked anything yet

## Registers

It's like a clipboard history

| Command | Action                                             |
| ------- | ---------------------------------------------------|
| `:reg`  | List registers (List yanked test                   |
| `"2p`   | Pastes register 2 (after you list registers first) |


## Changes

| Command | Action                                          |
| ------- | ----------------------------------------------- |
| r       | Replace current character                       |
| ciw     | Change word no matter the position in the word  |
| ci`)`   | Change (inside) the contents until the next `)` |

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
| v`$`    | Select until the end of line                            |
| V       | Visual the complete line (Use jk to move the selection) |

## Quicfix and Location List

| Command    | Action                                                |
| ---------- | ----------------------------------------------------- |
| `:copen`   | Open error list (requires my configuration)           |
| `:cclose`  | Close error list (requires my configuration)          |
| `:cnext`   | Go to next error                                      |

## Debug utilities

| Command               | Action                                              |
| --------------------- | --------------------------------------------------- |
| :verbose imap `<tab>` | Find if the `<tab>` key is defined                  |
| :verbose imap `<C-p>` | Find if the `<ctrl>p` key is defined                |
| `<leader>lo`          | Executes `:lopen` show location list in the gutter  |
| `<leader>lc`          | Executes `:lclose` hide location list in the gutter |

## Native Autocomplete

| Command      | Action                                    |
| ------------ | ----------------------------------------- |
| `<C-x><C-p>` | Autocomplete with an already present word |

- Native autocomplete works by searching the current buffer

## Error/QuickFix list

| Command        | Action                                                               |
| -------------- | -------------------------------------------------------------------- |
| `:cw [height]` | Open the list of errors if there are any, close it if there are none |
| `:lw [height]` | Location list for the current buffer only                            |
| `:ccl`         | Close the list of errors                                             |
| `:lcl`         | Close the location list                                              |
| `<C-W>L`       | Move the window to the right (Uppercase H/J/K/L)                     |

## NERDTree Commands

This are particular to my configuration

| Command      | Action                                          |
| ------------ | ----------------------------------------------- |
| `<C-k><C-k>` | Toggle NERDTree (open if closed, close if open) |
| `<C-k><C-f>` | Toggle NERDTree and select the current file     |
|

This commands are to be executed while inside the NERDTree sidebar:

| Command | Action       |
| ------- | ------------ |
| s       | Open on left |
| vs      | Open on top  |

## NERD Commenter

This are the default key-maps

| Command            | Action                                                                            |
| ------------------ | --------------------------------------------------------------------------------- |
| `<leader>c<space>` | Toggle comments                                                                   |
| `<leader>ci`       | Toggles the comment state of the selected line(s) individually.                   |
| `<leader>cs`       | Toggle sexy Comments out the selected lines with a pretty block formatted layout. |

## ALE Commands

| Command    | Action                                                |
| ---------- | ----------------------------------------------------- |
| `:ALEFix`  | Format the current document with the configured fixer |
| `:ALEInfo` | Conf for the current buffer                           |
| `<leader>ap` | Show next error/warning                             |
| `<leader>an` | Shows the previous error/warning                    |


## FZF Commands

Its really helpful to use `:help fzf-vim-comands` to browse the [documentation](https://github.com/junegunn/fzf.vim/blob/master/doc/fzf-vim.txt)

| Command     | Action                                             |
| ----------- | -------------------------------------------------- |
| `:History`  | Opens up the list of last edited files             |
| `:GFiles`   | Ignores files in `.gitignore`                      |
| `:Tags`     | Tags in the project                                |
| `:Snippets` | UtilSnips snippets                                 |
| `:BCommits` | Commits for the current buffer (Requires Fugitive) |
| `<C-k><C-u>`| Executes `:Buffers`                                |

- Most commands support CTRL-T / CTRL-X / CTRL-V key bindings to open in a new
  tab, a new split, or in a new vertical split

## GitGutter

| Command          | Action                          |
| ---------------- | ------------------------------- |
| :GitGutterToggle | Show/Hide file changes          |
| `[c`             | Show next blog of changes       |
| `]c`             | Show previous blog of changes   |
| `<Leader>hu`     | Remove hunk                     |
| `:GitGutterFold` | Toggle fold of the file changes |

## CoC commands

This commands assume you used the [example configuration](https://github.com/neoclide/coc.nvim#example-vim-configuration) suggested by the [CoC github page](https://github.com/neoclide/coc.nvim)

| Command                     | Action                      |
| --------------------------- | --------------------------- |
| `:Format`                   | Code beautify               |
| `:Fold`                     | Fold functions              |
| `:OR`                       | Organize Imports            |
| `:CocConfig`                | Open the configuration file |
| `:CocInstall <plugin name>` | Install a new CoC plugin    |
