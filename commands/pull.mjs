import { cwd } from 'process'
import { basename } from 'path'
import { promisify } from 'util'
import { exec } from 'child_process'
const execAsync = promisify(exec);

const pullMethod = {
    'one-pulse-app': pullOpa,
    'onepulsemeta': pullOpm,
    'product-journeys-meta': pullPjm,
}
/**
 * @param {any} params
 */
export async function pullRepo(params) {
    const directory = basename(cwd());
    console.log(directory)
    // @ts-ignore
    await pullMethod[directory]();
}


async function pullOpa() {
    await pullInternal(['develop', 'stage', 'master'])
}

async function pullPjm() {
    await pullInternal(['develop', 'uat', 'master'])
}

async function pullOpm() {
    await pullInternal(['develop', 'uat', 'one-pulse-prod'])
}

/**
 * @param {string[]} branches
 */
async function pullInternal(branches) {
    await execAsync('rm -f ./.git/index.lock')
    const currentBranch = await execAsync('git branch --show-current')
    branches.unshift(currentBranch.stdout);
    await execAsync('git fetch --all')

    branches.forEach(async b => {

        await execAsync(`git checkout ${b}`)
        await execAsync(`git pull`)
    })
}

