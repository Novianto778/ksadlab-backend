cd node_modules/.bin
pm2 install typescript
cd ..
cd ..
pm2 start src/index.ts -i 0 --watch
