const { MSICreator } = require('electron-wix-msi');
const path = require('path');

const APP_DIR = path.resolve(__dirname, './ScheDOler-win32-x64');
const OUT_DIR = path.resolve(__dirname, './ScheDOlerSetup');

const msiCreator = new MSICreator({
    appDirectory: APP_DIR,
    outputDirectory: OUT_DIR,

    exe: 'ScheDOler',
    name: 'ScheDOler',
    manufacturer: 'vyshnovka',
    version: '1.0.0',

    ui: {
        chooseDirectory: true
    },
});

msiCreator.create().then(function() {
    msiCreator.compile();
});