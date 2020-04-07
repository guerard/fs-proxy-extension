#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const NativeHostMessenger = require('native-host-messenger').NativeHostMessenger;


new NativeHostMessenger((msg, sendMessage) => {
    if (msg.writeFile) {
        sendMessage({ newFileName: writeFile(msg.stringToWrite, msg.dir) })
    } else {
        sendMessage({ ...msg, echo: true })
    }
});


function writeFile(stringToWrite, dir) {
    const newFileName = path.resolve(dir, new Date().toISOString() + '.txt');
    fs.writeFileSync(newFileName, stringToWrite);
    return newFileName;
}