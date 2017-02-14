#!/bin/bash
APPNAME=MineOS-Electron
VERSION=1.6.0
electron-packager . $APPNAME --platform=linux --arch=x64 --electron-version=$VERSION --overwrite=true --asar=false --app_version=0.0.1 --appname=$APPNAME --out=releases --overwrite=true --icon=images/app.png
