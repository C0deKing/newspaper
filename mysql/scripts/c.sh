DATE=$(date +%Y%m%d)
num=0
script="${DATE}_${num}"
filename="${script}.sql"

while [ -f $filename ]; do
    num=$(( $num + 1 ))
    script="${DATE}_${num}"
    filename="${script}.sql"
done

sed "s/script_template/${script}/g" script_template.sql > $filename
subl ${filename}
