#!/bin/bash

echo "Node version: `node -v`"
echo "NPM version: `npm -v`"
echo "Yarn version: `yarn -v`"

rm -rf dist
rm -rf index.js
yarn install
yarn build_component
yarn build
cp ./package.json ./dist
[ -f README.md ] && cp ./README.md ./dist
[ -f *.scss ] && cp ./*.scss ./dist/
cd dist
npm pack
# yarn publish --non-interactive ./dist