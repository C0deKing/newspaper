path="newspaper"

Web() {
    echo "starting new process"
    cd "$path/web"
    pm2 kill
    npm install
    pm2 start --name newspaper index.js
    cd
}

echo "............Fetching Latest.........."
cd "$path"
git pull
Web


#rm temp.txt

#git config --global credential.helper 'cache --timeout=10000000'
