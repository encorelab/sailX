#/bin/bash
cd encore_login
npm install
npm link
cd ../horizon-redux-sync
npm install
npm link
cd ../statemon
npm install
cd ../ckx
npm install
npm link encore_login
npm link horizon-redux-sync
cd ..
sh reinitialize_schema.sh
