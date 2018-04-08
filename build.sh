path="newspaper"
export MYSQL_PWD="F7UL42z4fkrp3YNw"
host="smp-dev.czlhf4fdxrw2.us-east-1.rds.amazonaws.com"
user="newspaper"
now="$(date +'%Y/%h/%d')"
DataBase() {
        echo "Updating Database Structure"
        echo "Updating Database Structure" >> build-output.txt
        ls


        #Remove the old buildfile
        cd "$path/mysql/build"
                rm build_file.txt
                touch build_file.txt

        # Make sure that the structure is there for scripts and error logging
        cd "$path/mysql/init"
                mysql --host="$host" --user="$user" --database="newspaper"  <  structure.sql



        # Then Functions
        cd "$path/mysql/functions"
                shopt -s nullglob
                for i in *.sql; do      
                        mysql  --host="$host" --user="$user" --database="newspaper"  < "$i" >> temp.txt 2>&1
                        if [ -s temp.txt ]      
                        then
                                echo "<br/><b><h4>$i</h4></b><br/>" >> ../build/build_file.txt
                            cat  temp.txt >> ../build/build_file.txt
                            echo "<br/>" >> ../build/build_file.txt     
                        fi
                        rm temp.txt
                done


        #Then Procs
        cd "$path/mysql/procs"
                shopt -s nullglob
                for i in *.sql; do      
                        mysql --host="$host" --user="$user" --database="newspaper"  < "$i" >> temp.txt 2>&1
                        if [ -s temp.txt ]      
                        then
                                echo "<br/><b><h4>$i</h4></b><br/>" >> ../build/build_file.txt
                            cat  temp.txt >> ../build/build_file.txt
                            echo "<br/>" >> ../build/build_file.txt     
                        fi
                        rm temp.txt
                done
        


        # Run Scripts last because we need to use the procs and functions sometimes 
        cd "$path/mysql/scripts"
                shopt -s nullglob
                for i in *.sql; do      
                        mysql --host="$host" --user="$user" --database="newspaper"  < "$i" >> temp.txt 2>&1
                        if [ -s temp.txt ]      
                        then
                                echo "<br/><b><h4>$i</h4></b><br/>" >> ../build/build_file.txt
                            cat  temp.txt >> ../build/build_file.txt
                            echo "<br/>" >> ../build/build_file.txt     
                        fi
                        rm temp.txt
                done


        #  Check the buildfile and send the results to me if there are any errors
        cd "$path/mysql/build"
                if [ -s build_file.txt ] 
                then 
                    echo "Errors in MySQL build"
                fi

        echo "Database Update Complete"
        

}

Web() {
    echo "starting new process"
    cd "$path/web"
    pm2 kill
    npm install
    pm2 start --name newspaper index.js
}



echo "............Fetching Latest.........."
git pull
DataBase
Web


#rm temp.txt

#git config --global credential.helper 'cache --timeout=10000000'
