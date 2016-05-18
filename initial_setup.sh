#/bin/bash
cd encore_login
npm install
npm link
cd ../horizon-redux-sync
npm install
npm link
cd ../ckx
npm install
npm link encore_login
npm link horizon-redux-sync
./node_modules/.bin/hz set-schema .hz/schema.toml
