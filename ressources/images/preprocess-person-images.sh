#!/bin/bash

cd persons-raw

# normalize file extension
for file in *.JPG; do
  mv "$file" "${file%.JPG}.jpg"
done


# convert gif to jpg
find . -type f -iname "*.gif" -exec convert {} {}.jpg \;
for file in *.gif.jpg; do
    mv "$file" "$(basename "$file" .gif.jpg).jpg"
done 

# copy to public folder
# cp ./* ./../client/scr/assets/persons
