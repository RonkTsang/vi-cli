'use strict'

// const prompt = require('co-prompt')
const inquirer = require('inquirer');
const qustions = require('../prompt').prompt
const tpls = require('../template')
const chalk = require('chalk')
const download = require('download-git-repo')

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
    console.log(`\n run npm install \n`)
  }
  
  // exec(cmdStr, (error, stdout, stderr) => {
  //   if (error) {
  //     console.log(error)
  //     process.exit()
  //   }
  //   console.log(chalk.green('\n √ Generation completed!'))
  //   console.log(`\n cd ${projectName} && npm install \n`)
  //   process.exit()
  // })
}

function downloadTpl(tplURL) {
  return new Promise((resolve, reject) => {
    download(tplURL, './', (err) => {
      if (err) {
        reject(err)
      } else {
        resolve(null)
      }
    })
  })
}