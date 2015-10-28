/**
 * Created by danielxiao on 15/10/23.
 * 在根目录运行
 */

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var glob = Promise.promisify(require("glob"));
var _ = require('lodash');

var basePath = './themes/landscape/source/images/cases/*';

var pageContent = 'title: {title}\n' +
                  'date: 2015-10-05 20:54:44\n' +
                  'tags:\n' +
                  '---\n' +
                  '\n' +
                  '---------------------------------------\n\n';

var caseMaps = {
  breathe: {
    title: '呼吸系统'
  },
  cardiovascular: {
    title: '心血管系统'
  },
  courage: {
    title: '肝，胆及胰腺系统'
  },
  digest: {
    title: '消化系统'
  },
  endocrine: {
    title: '内分泌系统'
  },
  motion: {
    title: '运动系统'
  },
  other: {
    title: '健美及其它'
  },
  skin: {
    title: '皮肤系统'
  }
};

glob(basePath).then(function(files) {
  files.reduce(function(chain, filePath) {
    return chain.then(function() {
      return glob(filePath + '/*');
    }).then(function(imgs) {
      var dirName;
      var imgContent = _.map(imgs, function(img) {
        var pathArray = img.split('/');
        var imgName = pathArray.pop();
        dirName = pathArray.pop();
        var imgUrlTxt = '![Alt text](/pocket-fkc-pages/images/cases/' + dirName + '/' + imgName + ')\n';
        return imgUrlTxt;
      });
      var content = pageContent.replace('{title}', caseMaps[dirName].title) + imgContent.join('');
      return fs.writeFile('./source/_posts/fkc-cases-sharing-' + dirName + '.md', content);
    })
  }, Promise.resolve());
});



