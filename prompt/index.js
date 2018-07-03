const tpls = require('../template')

const tplsName = Object.keys(tpls)

exports.prompt = [{
  type: 'input',
  name: 'projectName',
  message: 'project name: '
}, {
    type: 'input',
    name: 'author',
    message: 'author\'s name: '
},{
  type: 'list',
  name: 'tpl',
  message: 'choose a template',
  choices: tplsName
}]