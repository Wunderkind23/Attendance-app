# HCMatrixV3.0 Utility Microservice

## Introduction

This README contains basic cloning and running instructions for you to be able to get the API with all the necessary
dependencies up and running locally. This file, though, does not contain exact details, and rules, that are to be
followed throughtout the development of the API.

## Cloning the repo

**NOTE:** Make sure you have Git installed on your system.

```bash
  # HTTPS
  $ git clone https://github.com/SnapnetDev/hcmatrixV3.0-utility-api.git

  # SSH
  $ git clone git@github.com:SnapnetDev/hcmatrixV3.0-utility-api.git

  # Enter into the directory that has been cloned
  $ cd hcmatrixV3.0-utility-api

  # Initialize the submodules
  $ git submodule init

  # Add and update the submodules with the updated repository
  $ git submodule update
  
  # Install all the dependencies
  $ npm install

  # Start the server in developement mode
  $ npm run dev

  # PS: Remember to periodically update your submodules to keep them up-to-date with the changes in the original repository. 
  $ git submodule update --remote
```
