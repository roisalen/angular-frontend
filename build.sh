#!/bin/sh
repopath=$(dirname $( readlink -f $0 ) )
cd $repopath && git pull
cp index.html $1/
cp favicon.ico $1/
cp -r resources $1/
cp -r modules $1/
cp -r node_modules $1/
