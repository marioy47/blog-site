# Install a Windows 10 developement machine with docker and wsl 2


## Enable WSL2

https://docs.microsoft.com/en-us/windows/wsl/install-win10

- Ctrl-s Windows Features
  - Windows sub-system for linux
  - Windows Virtualization
- Windows Kernel
- Open powershell
  - Paste command for default use wsl2
- Install a linux distro Ubuntu 20.04 LTS

## Winget

Like brew or apt-get but for windows packages.

As of April 2021 the best way to install it is using the [releases](https://github.com/microsoft/winget-cli/release) page on the official [GitHub](https://github.com/microsoft/winget-cli) repository.

you have to install the flight or preview version of Windows [App Installer](https://www.microsoft.com/p/app-installer/9nblggh4nns1?ocid=9nblggh4nns1_ORSEARCH_Bing&rtc=1&activetab=pivot:overviewtab) or

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

- Google Docker Desktop Windows
- Checkbox to use wsl2 engine
- Resource WSL integration enable


