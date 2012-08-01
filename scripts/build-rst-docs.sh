
rstdir="../src"
htmldir="../docs/"


for dir in $rstdir/*
do
    eachrstdir=`basename $dir`;
    echo "HTML will be generated from $dir/ to  $htmldir/$eachrstdir/ ";
    sphinx-build $dir/ $htmldir/$eachrstdir/;
done

