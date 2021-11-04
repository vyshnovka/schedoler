# ScheDOler

ScheDOler is an application for scheduling tasks and organizing personal time. Nothing innovative, just everything you need (almost).   
By now this is an offline desktop application, but maybe someday it will be possible to use it cross-platform.

## Tools

![image](https://img.shields.io/badge/JavaScript-e09d28?style=for-the-badge&logo=javascript&logoColor=white) 
![image](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) 
![image](https://img.shields.io/badge/Electron-31374d?style=for-the-badge&logo=electron&logoColor=white) 
![image](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white) 

## Setup

The only problem is the **sqlite3** module, which has brutally destroyed a huge amount of my nerve cells.   
This module is not intended to work on Windows, and manual rebuild for some reason did not help, so the only solution is to download it directly from official website.   
`npm install sqlite3 --build-from-source –runtime=electron –target=[electron-version] --dist-url=https://electronjs.org/headers`

## Installation

If you have Windows x64, just simply download the installer from released version. That's all.   
If not, try following steps below.   

## Build

Optionally you can rebuild this project and even create a new installer. All packages are included.   
1. Rebuild using `electron-packager ./ --platform=[your_platform] --arch=[x32/x64/x86]  ScheDOler`.   
2. To create a new installer go to **installer.js** and change line 4: `const APP_DIR = path.resolve(__dirname, './[name_of_just_created_folder]');`. 
3. Use `node installer.js` after.
