export MYSQL_PWD="F7UL42z4fkrp3YNw"
host="smp-dev.czlhf4fdxrw2.us-east-1.rds.amazonaws.com"
user="newspaper"
now="$(date +'%Y/%h/%d')"
echo "Executed: $(date)" >> build-output.txt
echo "--------------------------------------------------------------" >> build-output.txt

DataBase() {
        echo "Updating Database Structure"
        echo "Updating Database Structure" >> build-output.txt

        cd mysql


        #Remove the old buildfile
        cd build
                rm build_file.txt
                touch build_file.txt
        cd ../

        # Make sure that the structure is there for scripts and error logging
        cd init 
                mysql --host="$host" --user="$user" --database="newspaper"  <  structure.sql
        cd ../



        # Then Functions
        cd functions
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
        cd ../

        #Then Procs
        cd procs
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
        cd ../


        # Run Scripts last because we need to use the procs and functions sometimes 
        cd scripts
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
        cd ../


        #  Check the buildfile and send the results to me if there are any errors
        cd build
                if [ -s build_file.txt ] 
                then 
                    echo "Errors in MySQL build"
                fi
        cd ../

        echo "Database Update Complete"
        
        cd ../

}

while test $# -gt 0; do
        case "$1" in                
                -db | -mysql) 
                        DataBase
                        break
                        ;;                                   
        esac
done


echo "" >> build-output.txt
echo "Finished: $(date)" >> build-output.txt
echo "--------------------------------------------------------------" >> build-output.txt
echo "--------------------------------------------"
echo "Build Complete" 
echo "--------------------------------------------"