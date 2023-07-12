git pull --force

cd views/app 
npm i --legacy-peer-deps
npm run build
cd ../..

cd views/auth
npm i --legacy-peer-deps
npm run build
cd ../..

npm i --legacy-peer-deps
