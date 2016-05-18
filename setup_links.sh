#/bin/bash
cd encore_login
npm link
cd ../horizon-redux-sync
npm link
cd ../ckx
npm link encore_login
npm link horizon-redux-sync
./node_modules/horizon/hz set-schema .hz/schema.toml
