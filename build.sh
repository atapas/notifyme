#!/bin/bash

# This project us published using https://github.com/atapas/react-package-publisher

#*************************************************
#******* Check Node, NPM and Yarn Versions *******
#*************************************************
echo "Node version: `node -v`"
echo "NPM version: `npm -v`"
echo "Yarn version: `yarn -v`"

#******* Remove the existing dist folder ******
rm -rf dist
#******* Remove the existing index.js file ******
rm -rf index.js

#******* Perform yarn install(Dependency Management) ******
yarn install

#************************************************************************
#******* Build Components => create index.js file and dist folder *******
#************************************************************************
yarn build_component
yarn build

#******************************************************
#******* Copy other required files to the dist folder *******
#******************************************************
cp ./package.json ./dist
[ -f README.md ] && cp ./README.md ./dist
[ -f *.scss ] && cp ./*.scss ./dist/

#******************************************************
#******* Create a tarball npm for local testing *******
#******************************************************
cd dist
# npm pack
cd ..

#*****************************************************************************************
#******* Login and Publish => There are 2 ways to login*******
# 1. Using non interactive mode => Uncomment the line starts with npm-login-noninteractive
# and edit the required parameter values like, <USER_NAME>, <PASSWORD> and <EMAIL>
# 2. Using Intercative mode(Default) => npm login will ask for username, password and email
#******************************************************************************************
# npm-login-noninteractive -u <USER_NAME> -p <PASSWORD> -e <EMAIL>
npm login
yarn publish ./dist