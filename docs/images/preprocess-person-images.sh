#!/bin/bash

cd persons-raw

# copy to public folder
rm ./../../client/src/assets/persons/*
cp ./* ./../../../client/src/assets/persons/
cd ./../../../../client/src/assets/persons/

# normalize file extension
for file in *.JPG; do
	echo "Renamed $file to jpg"
  mv "$file" "${file%.JPG}.jpg"
done

for file in *.jpeg; do
	echo "Renamed $file to jpg"
  mv "$file" "${file%.jpeg}.jpg"
done

for file in *.JPEG; do
	echo "Renamed $file to jpg"
  mv "$file" "${file%.JPEG}.jpg"
done


# convert gif to jpg
find ./ -type f -iname "*.gif" -exec convert {} {}.jpg \;
for file in *.gif.jpg; do
	echo "Renamed $file to jpg"
	mv "$file" "$(basename "$file" .gif.jpg).jpg"
done 

rm ./*.gif


# scale images to the same with

find ./ -type f -iname "*.jpg" -exec mogrify -scale 210 {} \;

find ./ -type f -iname "*.jpg" -exec mogrify -quality 95 {} \;

find ./ -type f -iname "*.jpg" -exec mogrify -colorspace gray {} \;

rm ./../../../client/public/img/persons/*.jpg
#ls ./../../../client/public/img/persons
cp ./* ./../../../client/public/img/persons

#/client/public/img/persons

exit;

exit
