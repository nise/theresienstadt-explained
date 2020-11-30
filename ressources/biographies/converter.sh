#!/bin/bash



# convert from libre office writer to latex 
java -jar ./writer2latex.jar -latex \
        -use_color=false \
        -backend=pdftex \
        -inputencoding=utf8 \
        -multilingual=false \
        -float_figures=true \
        -ignore_hard_page_breaks=true \
        -ignore_double_spaces=true \
        -no_preamble=false \
        -formatting=ignore_most \
        Kurzbiographien.odt
        
        
pdflatex Kurzbiographien.tex
