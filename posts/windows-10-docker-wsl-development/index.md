# Install a Windows 10 developement machine with docker and wsl 2


## Enable WSL2

https://docs.microsoft.com/en-us/windows/wsl/install-win10

- Ctrl-s Windows Features
  - Windows sub-system for linux
  - Windows Virtualization
- Windows Kernel
- Open powershell
  - Paste command for default use wsl2

```ps1
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

Restart

Set default version to WSL 2

```ps1
wsl --list --verbose
wsl --set-default-version 2
```

Install updated kernel

https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi

Restart



## Winget

Like brew or apt-get but for windows packages.

As of April 2021 the best way to install it is using the [releases](https://github.com/microsoft/winget-cli/release) page on the official [GitHub](https://github.com/microsoft/winget-cli) repository.

you have to install the flight or preview version of Windows [App Installer](https://www.microsoft.com/p/app-installer/9nblggh4nns1?ocid=9nblggh4nns1_ORSEARCH_Bing&rtc=1&activetab=pivot:overviewtab) or

## Install Ubuntu

```bash
winget install ubuntu
```

## PowerToys 

- Powertoys github 
- Alt-space
- Fancy Zones

```cmd
winget install powertoys
```

## Terminal

- MS Terminal
- Dropdown to switch to wsl
- Low imput latency

```cmd
winget install "Windows Terminal"
```

## Docker

```ps1
winget install docker
```

- Open Docker Desktop Windows as **administrator**
- Checkbox to use wsl2 engine
- Resource WSL integration enable

## Oh My Zsh and ASDF
https://ohmyz.sh/

```bash
sudo apt-get install zsh unzip
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

This will ask you if you want to change your shell to `zsh` wich you should say "yes"

Then edit `~/.zshrc`  and look for the `plugins` variable and make the following changes

```bash
ZSH_THEME="bira"
# ...
plugins=(git asdf)
unsetopt BEEP
```
https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/asdf

Then source the file with 

```bash
source ~/.zshrc
git clone https://github.com/asdf-vm/asdf.git ~/.asdf
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.8.0
```

## Install node

```bash
asdf plugin add nodejs
asdf list all nodejs
asdf install nodejs lts
asdf list nodejs
asdf global nodejs lts
asdf plugin add yarn 
asdf install yarn latest
asdf list yarn
asdf global yarn 1.22.10
asdf current
```

## NeoVim

```bash
asdf plugin add neovim
asdf install neovim nightly
asdf global neovim nightly
nvim -v
adsf current
```

## Install npm modules

```bash
npm install -g pnpm yarn
```

## Restore secrets files

You'll need `.ssh` folder with your gihub keys

Additionally I have an `.rclone.conf`, `.netrc` file and `.aws` folder with secrets

```bash
unzip /mnt/c/Users/Mario/Downloads/backup-secret-dotfiles.zip
```

## Restores dotfiles

```bash
git clone git@github.com:marioy47/dotfiles.git
```

I like to keep it in the root of my home directory



