# ScheDOler

ScheDOler is an application for scheduling tasks and organizing personal time. Nothing innovative, just everything you need (almost).   
By now this is an offline desktop application, but maybe someday it will be possible to use it cross-platform.

## Tools

![image](https://img.shields.io/badge/JavaScript-e09d28?style=for-the-badge&logo=javascript&logoColor=white) 
![image](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) 
![image](https://img.shields.io/badge/Electron-31374d?style=for-the-badge&logo=electron&logoColor=white) 
![image](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white) 

## Setup

> not done yet, sorry not sorry

The only problem is the _sqlite3_ module, which has brutally destroyed a huge amount of my nerve cells.   
This module is not intended to work on Windows, and manual rebuild for some reason did not help, so the only way was to download it directly from official website.   
    npm install sqlite3 --build-from-source –runtime=electron –target=[electron-version] --dist-url=https://electronjs.org/headers

## Build

Optionally you can build this project and even create an installer. All packages are included.
