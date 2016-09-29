#太多图片一起push时经常超时传不上去，可用该脚本自动一张一张push上去

for name in `ls ./cases`
do
 echo "pushing $name"
 git add "./cases/$name"
 git commit -m '123'
 git push origin master
done