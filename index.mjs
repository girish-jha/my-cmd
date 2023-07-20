#! /usr/bin/env node

import { program } from "commander";
import { cherryPickPjm, pullRepo } from './commands/index.mjs'


program.command('cherry-pick-pjm')
    .description('cherry picks pjm based on filter if merge commit messages')
    .option('-f|--from <from>')
    .option('-t|--to <to>')
    .action(cherryPickPjm)

program.command('pull')
    .description('pull the current git directory ')
    .action(pullRepo)

program.parse();