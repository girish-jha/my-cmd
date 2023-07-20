import { Chalk } from "chalk";

const chalk = new Chalk();

export const logger = {
    info : (/** @type {unknown} */ msg) => console.log(chalk.green(msg)),
    debug : (/** @type {unknown} */ msg) => console.log(chalk.grey(msg)),
    log : (/** @type {unknown} */ msg) => console.log(msg),
    error : (/** @type {unknown} */msg) => console.log(chalk.red(msg)),
    warn : (/** @type {unknown} */msg) => console.log(chalk.yellowBright(msg))
}