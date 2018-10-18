<div align="center">

![socket-tester-banner](build/icons/banner.png)
</div>

<div align="center">

[![made-with-electron](https://img.shields.io/badge/made%20with-electron-green.svg?longCache=true&style=for-the-badge)](https://electron.io)
![with-vue](https://img.shields.io/badge/made%20with-vue.js-green.svg?longCache=true&style=for-the-badge&logo=vue.js)
![for-develipers](https://img.shields.io/badge/for-developers-orange.svg?longCache=true&style=for-the-badge)
![GitHub](https://img.shields.io/badge/license-MIT-blue.svg?longCache=true&style=for-the-badge)
<br>
[![Travis (.org) branch](https://img.shields.io/travis/OsirisFrik/socketTester/master.svg?icon=travisci&longCache=true&style=for-the-badge)](https://travis-ci.org/OsirisFrik/socketTester)
[![Build status](https://img.shields.io/appveyor/ci/OsirisFrik/SocketTester/master.svg?icon=appveyor&longCache=true&style=for-the-badge)](https://ci.appveyor.com/project/OsirisFrik/sockettester/branch/master)
<br>
![windows](https://img.shields.io/badge/windows-blue.svg?icon=apple&longCache=true&style=for-the-badge)
![osx](https://img.shields.io/badge/osx-blue.svg?icon=appveyor&longCache=true&style=for-the-badge)
![linux](https://img.shields.io/badge/linux-lightgrey.svg?icon=linux&longCache=true&style=for-the-badge)
<br>
<br>

![main](docs/main.PNG) 
<br>
![events](docs/events.PNG)
<br>
![emits](docs/emits.PNG)
</div>

## Features
- [x] Sockets tabs
- [x] Socket query
- [x] Socket path
- [x] Listen events
- [x] Emit events

## Roadmap
- [ ] App settings
- [ ] Export/Import data
- [ ] Ace theme custom

## Developer Notes

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


# lint all JS/Vue component files in `src/`
npm run lint

# copy config.example.js in renderer to config.js by executing cp config.example.js config.js and set Mercury parser token
cp src/renderer/config.example.js config.js

```

For more documentation please follow link from [Electron Vue](https://simulatedgreg.gitbooks.io/electron-vue/content/)

## Powered by

- [Electron](https://electron.io)
- [Electron Vue](https://github.com/SimulatedGREG/electron-vue)
- [Vuetifyjs](https://vuetifyjs.com)
- [Vue](https://www.vuejs.org) & [Vuex](https://vuex.vuejs.org)
- [NeDB](https://github.com/jrop/nedb-promise)
