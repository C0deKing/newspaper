path="newspaper"
build=$(uuidgen)
Web() {
    echo "starting new process"
    cd "$path/web"

    sed -i "s/{uuid}/$build/g" views/index.html
    webpack -d
    pm2 kill
    npm install
    pm2 start --name newspaper index.js
    cd
}

echo "............Fetching Latest.........."
cd "$path"
git reset --hard HEAD
git pull
cd ../
Web


#rm temp.txt

#git config --global credential.helper 'cache --timeout=10000000'
