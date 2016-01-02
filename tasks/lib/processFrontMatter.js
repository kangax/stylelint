var fs = require('fs');
var buildFrontMatter = require('./buildFrontMatter');
var prependFrontMatter = require('./prependFrontMatter');

module.exports = function (paths, properties) {
  paths.forEach(function (p) {
    console.log('Processing', p);

    var frontMatter = buildFrontMatter(p, properties);
    var contents = fs.readFileSync(p, 'utf-8');
    var newContents = prependFrontMatter(frontMatter, contents);
    fs.writeFileSync(p, newContents);
  });
};
