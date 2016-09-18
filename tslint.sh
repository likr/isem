cmd="`git diff --name-only`"
for file in $cmd
do
  ext="${file##*.}"
  if [ ${ext} = ts ]; then
    $(npm bin)/tslint $file
  fi
done
