---
title: My (Neo)Vim Cheat Sheet
date: 2020-04-30
tags: vim, neovim, php, python, node
cover: vim-cheat-sheet-cover.png
---

# My (Neo)Vim Cheat Sheet

I love _Vim_ because I can do everything with the keyboard. The downside, is that _you have to do everything with the keyboard_.

In case you didn't get the pun, the real problem is that you have to memorize a bunch of commands and key combinations to to do things like delete a line in the current text or how to format the current buffer.

To aid myself on memorizing this commands I created this cheat sheet that works with **[my configuration](https://github.com/marioy47/dotfiles/blob/master/.vimrc)**.

If you want something more complete, graphical and generic, you can visit the [Graphical vi-vim Cheat Sheet and Tutorial](http://www.viemu.com/a_vi_vim_graphical_cheat_sheet_tutorial.html) site.

One thing tough. I try to use the default key-maps as much as I can, so this cheat sheet might still be useful to you in case you want to create you own.

## TOC

```toc
from-heading: 2
to-heading: 3
```

## Movements and insert

This commands are for **normal** mode:

| Command    | Action                                                    |
| ---------- | --------------------------------------------------------- |
| `w`        | Beginning of the next word                                |
| `b`        | Beginning of the _previews_ word                          |
| `e`        | End of the next word                                      |
| `$`        | End of line                                               |
| `f<char>`  | Go to forward to the next character. Pe. `fx`             |
| `{`        | Go to previous _paragraph_ (empty line)                   |
| `}`        | Go to next paragraph (empty line)                         |
| `A`        | Add text at the end of the line                           |
| `I`        | Add text at the beginning of the line                     |
| `zz`       | Place the current line in the middle of the editor window |
| `z<enter>` | Place the current line at the top of the editor window    |

### Advanced movement commands

All this commands are for **normal** mode:

| Command | Action                                                            |
| ------- | ----------------------------------------------------------------- |
| `gg`    | Go to beginning of file                                           |
| `G`     | Go to end of file                                                 |
| `<C-f>` | Page Down (Page Forward)                                          |
| `<C-b>` | Page Up (Page Backward)                                           |
| `gd`    | Go to _definition_ of word or function in current file            |
| `gf`    | To to _definition_ in other file                                  |
| `16G`   | Go to line 16                                                     |
| `<C-o>` | Previous position or previous buffer (useful when using gd or gf) |
| `<C-i>` | Next position or next buffer                                      |

## Advanced save

This commands are for **normal** mode:

| Command              | Action                                                  |
| -------------------- | ------------------------------------------------------- |
| `#,#w file-name.txt` | Saves part of a file to a new file                      |
| `:r file-name.txt`   | Inserts contents of `file-name.txt` in current position |

## Delete Undo/Redo

This commands are for **normal** mode:

| Command | Action                                         |
| ------- | ---------------------------------------------- |
| `x`     | Cut (Works in visual mode too)                 |
| `s`     | Cut (Substitute) char and place in insert mode |
| `de`    | Delete to end of word                          |
| `d0`    | Delete to the beginning of the line            |
| `db`    | Delete back                                    |
| `dfx`   | Delete until the next `x`                      |
| `:.,$d` | Delete until the end of the buffer             |
| `u`     | Undo                                           |
| `U`     | Undo on the whole line                         |
| `<C-r>` | Redo                                           |

## Repeat

Most commands, when preceded by a number, are executed multiple times:

| Command | Action                             |
| ------- | ---------------------------------- |
| `6dw`   | Delete next 6 words                |
| `6dd`   | Delete next 6 lines                |
| `.`     | Redo last change action            |
| `;`     | Redo last character find `f{char}` |

## Clipboard

| Command       | Action                                                                  |
| ------------- | ----------------------------------------------------------------------- |
| `y<movement>` | Copy (Yank). `<movement>` can be `h`, `j`, `l`, `k`, `w`, `e`, `$`, `0` |
| `p`           | Paste it after the cursor                                               |
| `dd`          | Delete line                                                             |
| `O`           | Paste over the current line                                             |
| `P`           | Paste under the current line                                            |

- The last 2 command work to add a new line before or after the current line if you haven't yanked anything yet

### Registers

It's like a clipboard history

| Command               | Action                                                                      |
| --------------------- | --------------------------------------------------------------------------- |
| `:reg`, `:reg [char]` | List registers. Show contents of one register                               |
| `"<char>p`            | Paste contents of register. Pe. `"rp` register `r`. `"2p` Pastes register 2 |
| `"<char>y`            | Yank text to the _named_ register `<char>`. Pe `"ry`                        |
| `"<char>x`            | Cut text to register                                                        |
| `<C-r><char>`         | Paste the contents of register in **insert mode**                           |
| `""`                  | The register used when Copy (`y`), Cut (`x`) or Substitute (`s`)            |
| `"0`-`"9`             | Last yanked elements being `"0` the newest ( `"0p` is the same as `p`)      |
| `"%`                  | Current file path starting from the project root                            |

- When you create a macro with `q`, p.e. `qw`, the steps of the macro will be sotred in the _register_ `w`
- `:let @W='i;'` (Uppercase W) will **append** a new step to the register `w` (lowercase w)

## Changes

| Command | Action                                                                 |
| ------- | ---------------------------------------------------------------------- |
| `r`     | Replace current character                                              |
| `R`     | Overwrite content (replace) until you escape                           |
| `ciw`   | _Change Inside_ word no matter the position                            |
| `cip`   | _Change Inside_ paragraph (between empty lines) no matter the position |
| `ci)`   | Change (inside) the contents until the next `)`                        |

## Folding

| Command     | Action                                           |
| ----------- | ------------------------------------------------ |
| `zi`        | Fold enable                                      |
| `zf2j`      | Fold the next 2 lines                            |
| `:20,40 fo` | Fold from line 20 to 40                          |
| `zfa}`      | Fold until the next `}`                          |
| `zo zO`     | Open current fold. Open recursively              |
| `zc zC`     | Close current fold. Close recursively            |
| `za zA`     | Toggle current fold. Toggle recursively          |
| `zm zM`     | Reduce fold level by one. Close all folds        |
| `zr zR`     | Increase fold level by one. Increase recursively |

- With `set foldmethod=marker` the `{{{` and `}}}` symbols will be used as markers
- Use `foldlevel` (pe `foldlevel=99`) to fold all levels

## Search

| Command | Action                               |
| ------- | ------------------------------------ |
| `/`     | Search                               |
| `?`     | Search backwards                     |
| `*`     | Search for the word under the cursor |
| `n`     | Next result                          |
| `N`     | Previous result                      |

## Search & Replace

| Command               | Action                                               |
| --------------------- | ---------------------------------------------------- |
| `:s/original/new/g`   | Search and replace in the complete line              |
| `:%s/original/new/gc` | Search in all document asking if do the change (`c`) |

## Visual

| Command | Action                                                  |
| ------- | ------------------------------------------------------- |
| `v`     | **Start** the visual (Use jkhl to move the selection)   |
| `v$`    | Select until the end of line                            |
| `vip`   | Select current paragraph (content between empty lines)  |
| `V`     | Visual the complete line (Use jk to move the selection) |

## Splits

| Command      | Action                     |
| ------------ | -------------------------- |
| `:sp`, `:vs` | Split and _Vertical_ split |
| `:only`      | Focus on a splt            |
| `gi`         | Open in split in NERDTree  |

## QuickFix and Location List

| Command   | Action           |
| --------- | ---------------- |
| `:copen`  | Open error list  |
| `:cclose` | Close error list |
| `:cnext`  | Go to next error |

## Debug utilities

| Command               | Action                                                                           |
| --------------------- | -------------------------------------------------------------------------------- |
| `Ctrl-g`              | Show file status                                                                 |
| `:verbose imap <tab>` | Find if the `<tab>` key is defined                                               |
| `:verbose imap <C-p>` | Find if the `<ctrl>p` key is defined                                             |
| `:lopen`, `:lclose`   | Open/closes the location list. Used by plugins like ALE to show a list of errors |
| `:copen`, `:close`    | Open/Closes/Focuses the list of errors                                           |

## Native Autocomplete

| Command      | Action                                    |
| ------------ | ----------------------------------------- |
| `<C-x><C-p>` | Autocomplete with an already present word |

- Native autocomplete works by searching the current buffer

## Sessions

| Command       | Action                                                           |
| ------------- | ---------------------------------------------------------------- |
| `:mks <path>` | Saves the current session to a path. Better if it's a hidden dir |

## Markers and Macros

| Command        | Action                                               |
| -------------- | ---------------------------------------------------- |
| `m<character>` | Creates a marker with the name `<character`          |
| `'<character>` | Jumps to marker. (Use _backtick_ to include column ) |

## Spell

Spell needs to have `set spell` option active on `.vimrc` and optionally use `set spelllang=en_us`. I use `es_co` for Spanish Colombia.

| Command | Action                                      |
| ------- | ------------------------------------------- |
| `z=`    | Search for alternatives of the current word |
| `zg`    | Add current word to dictionary              |
| `zw`    | Remove current word from dictionary         |
| `]g`    | Jump to next error                          |
| `[g`    | Jump to previous error                      |

## Plugins

### NERDTree Commands

This are particular to my configuration

| Command      | Action                                          |
| ------------ | ----------------------------------------------- |
| `<C-k><C-k>` | Toggle NERDTree (open if closed, close if open) |
| `<C-k><C-f>` | Toggle NERDTree and select the current file     |

This commands are to be executed while inside the NERDTree sidebar:

| Command | Action          |
| ------- | --------------- |
| `s`     | Open on left    |
| `vs`    | Open on top     |
| `t`     | Open on new tab |

### NERD Commenter

This are the default key-maps

| Command            | Action                                                                            |
| ------------------ | --------------------------------------------------------------------------------- |
| `<leader>c<space>` | Toggle comments                                                                   |
| `<leader>ci`       | Toggles the comment state of the selected line(s) individually.                   |
| `<leader>cs`       | Toggle sexy Comments out the selected lines with a pretty block formatted layout. |

### FZF Commands

Its really helpful to use `:help fzf-vim-comands` to browse the [documentation](https://github.com/junegunn/fzf.vim/blob/master/doc/fzf-vim.txt)

| Command      | Action                                             |
| ------------ | -------------------------------------------------- |
| `:BCommits`  | Commits for the current buffer (Requires Fugitive) |
| `:Commands`  | Searchable list of ALL commands                    |
| `:GFiles`    | Ignores files in `.gitignore`                      |
| `:History`   | Opens up the list of last edited files             |
| `:Rg!`       | Like `grep` for all the project files but faster   |
| `:Snippets`  | UtilSnips snippets                                 |
| `:Tags`      | Tags in the project                                |
| `<C-k><C-u>` | Executes `:Buffers`                                |

- Most commands support CTRL-T / CTRL-X / CTRL-V key bindings to open in a new
  tab, a new split, or in a new vertical split

### GitGutter

| Command            | Action                          |
| ------------------ | ------------------------------- |
| `:GitGutterToggle` | Show/Hide file changes          |
| `[c`               | Show next block of changes      |
| `]c`               | Show previous block of changes  |
| `<Leader>hu`       | Remove hunk                     |
| `:GitGutterFold`   | Toggle fold of the file changes |

### Fugitive

This commands are to be executed on the `:Gstatus` window

| Command      | Action                                         |
| ------------ | ---------------------------------------------- |
| `g?`         | Show help                                      |
| `=`          | Toggle small diff of the file under the cursor |
| `-`          | Toggle stage/unstage file under cursor         |
| `dv`         | Diff split _vertically_                        |
| `<leader>gs` | Toggle Status (my `.vimrc`)                    |

### CoC commands

This commands assume you used the [example configuration](https://github.com/neoclide/coc.nvim#example-vim-configuration) suggested by the [CoC GitHub page](https://github.com/neoclide/coc.nvim)

| Command                     | Action                      |
| --------------------------- | --------------------------- |
| `:Format`                   | Code beautify               |
| `:Fold`                     | Fold functions              |
| `:OR`                       | Organize Imports            |
| `:CocConfig`                | Open the configuration file |
| `:CocInstall <plugin name>` | Install a new CoC plugin    |

### Vim-Surround

A complete tutorial can be viewed [here](https://www.youtube.com/watch?v=NsHAG4GmZYQ)

| Command            | Action                                                                                                |
| ------------------ | ----------------------------------------------------------------------------------------------------- |
| `ys<motion><char>` | You surround. Pe, `ysiw'`, `ysa2w"`                                                                   |
| `cs<char><char>`   | Change surrounding. Pe. `cs'"` Change surrounding `'` with `"`. Or `cstt` change tag with another tag |
| `ds<char>`         | Delete surrounding. Pe. `ds'` Remove surrounding quote. `dst` will delete a tag                       |
| `yss<char>`        | The line. Pe `yss"` Surround the line with `"`                                                        |
| `yssf`, `ysiwf`    | You surround with a function (It will prompt you for the function name). `iw` its _inside a word_     |
| `ysst`, `ysiwt`    | You surround with an html tag. (it will prompt you for the tag)                                       |
| `ysas"`            | You surround a Sentence                                                                               |
| `yS`               | Surround a _motion_ and adds a line afterwards. Pe. `ySi2w(`                                          |
| `ySS`              | Surround the complete line and add a line afterwrds. Pe `ySS(`                                        |

- **You have to provide a motion** after the prefix. Pe: `ysiw'`:
  - `y`ou `s`urround.
  - `i`nside.
  - Around a `w`ord.
  - The char `'`.
- If you use the opening character (`[({<`), instead of the closing one, you'll get an additional space in the surround

#### In visual mode

| Command | Action                      |
| ------- | --------------------------- |
| `S`     | Surround the selected words |
| `gS`    | Suppress auto indent        |

#### Aliases

| Char        | Alias    |
| ----------- | -------- |
| `)`         | b        |
| `}`         | B        |
| `]`         | r        |
| `>`         | a        |
| `_` (space) | s        |
| `<` (html)  | t        |
| `f`         | Function |

- If you change `t` with `<C-T>`. Surround will add an empty line before and after. And it will also indent the paragraph.
