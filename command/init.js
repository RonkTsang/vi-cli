'use strict'

// const prompt = require('co-prompt')
const inquirer = require('inquirer');
const qustions = require('../prompt').prompt
const tpls = require('../template')
const chalk = require('chalk')
const download = require('download-git-repo')
const path = require('path')

module.exports = async () => {
  let config = await inquirer.prompt(qustions)
  // let projectName = await prompt('Project name: ')
  let tplURL
  let branch
  
  tplURL = tpls[config.tpl]

  console.log(chalk.white('\n Start generating...'))

  var isError = await downloadTpl(tplURL)
  
  if (isError) {
    console.log(chalk.red('\n shit!'))
    console.log(isError)
  } else {
    console.log(chalk.green('\n √ Generation completed!'))
    console.log(chalk.green(`\n ${config.projectName} for ${config.author}`))
    console.log(`\n run tnpm install \n`)
  }

}

function downloadTpl(tplURL) {
  let target = path.resolve(process.cwd(), '.')
  return new Promise((resolve, reject) => {
    download(tplURL, target, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}