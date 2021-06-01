---
title: C# setupa and first steps for .NET Core development
tags: microsoft, windows, csharp
cover:
date: 2021-06-08
---

# C# setupa and first steps for .NET Core development

## Installation

```bash
winget install Microsoft.VisualStudio.2019.Community
```

![Select components 1](vs-install-01.png)
![Select components 2](vs-install-02.png)
![Select components 3](vs-install-03.png)

## First launch

![First launch - Login screen](launch-sign-in.png)
![Rirst launch - Theme selection](launch-theme-select.png)
![First launch - Proyect creation screen](launch-create-proyect.png)

## Managed vs Unmanaged code

- C# and Visual Basic are managed code
- Managed code converts code to something in the middle and that intermediate step converts it to machine language
- Unmanaged code compiles directly to machine language
- Unmanaged code does not have additional features like memory management
- Managed code allows you to interact with memory
- IL (Intermediate Language)
- CLR (Common language runtime)
- JIT Converts the IL to machine language

In https://sharplab.io/ you can compile from C# to IL

![IL using sharplab.io](sharplab-il.png)

## Creating Assemblies




