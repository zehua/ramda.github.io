var fs = require('fs')

var get_ramda_file = require('./get_ramda_file')

var handlebars = require('handlebars')

var marked = require('marked')

var devDependencies = require('./package.json').devDependencies
var version = devDependencies.ramda
var repl_tag = devDependencies['ramda-repl']

get_ramda_file('README.md')
.catch((err) => console.error(err))
.then((readme_md) => {
  var readme_html = marked(readme_md)

  var template = fs.readFileSync('repl/index.html.handlebars', {encoding: 'utf8'})

  var html = handlebars.compile(template)({
    version: version,
    repl_tag: repl_tag
  })

  fs.writeFileSync('repl/index.html', html, {encoding: 'utf8'})
  console.log('Generated repl/index.html');
})
