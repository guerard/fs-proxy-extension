#!/usr/bin/env node

const nativeMessage = require('chrome-native-messaging');
const fs = require('fs');
const path = require('path');

process.stdin
    .pipe(new nativeMessage.Input())
    .pipe(new nativeMessage.Transform(function (msg, push, done) {
        if (msg.writeFile) {
            push({
                newFileName: writeFile(msg.stringToWrite, msg.dir),
            });
            done();
            return;
        }
        var reply = JSON.parse(JSON.stringify(msg));
        push(reply);
        done();
    }))
    .pipe(new nativeMessage.Output())
    .pipe(process.stdout);


function writeFile(stringToWrite, dir) {
    const newFileName = path.resolve(dir, new Date().toISOString() + '.txt');
    fs.writeFileSync(newFileName, stringToWrite);
    return newFileName;
}