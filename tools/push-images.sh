#太多图片一起push时经常超时传不上去，可用该脚本自动一张一张push上去
#在项目根目录运行

for name in `ls ./themes/landscape/source/images/cases`
do
 echo "pushing $name"
 git add "./themes/landscape/source/images/cases/$name"
 git commit -m '123'
 git push origin master
done