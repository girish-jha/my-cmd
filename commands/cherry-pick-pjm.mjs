import { promisify } from 'util'
import { exec } from 'child_process'
import {logger} from '../utils/utils.mjs'

const execAsync = promisify(exec);




/**
 * @param {{ from: any; to: any; }} params
 */
export async function cherryPickPjm(params) {
    try {
        console.log('from cherry pick pjm', params)
        await execAsync('cd /Users/girishjha/Programming/PULSE/product-journeys-meta/')
        const { from, to } = params

        const messageRegex = /pull request #\d+/i
        // const getLogCmd = `git log --all --since "${from}" --until "${to}" --format="%H %d %s" --reverse`
        // const getLogCmd = `git log --all --after "${from}" --reverse --grep="release/pcapulseservices3 to uat" --format="%H %d %s"`
        const getLogCmd = `git log --all --after "${from}" --reverse --grep="release/pcapulseservices to uat" --format="%H %d %s"`
        const res = await execAsync('pwd')
        
        /*
        # git log --since "Jun 30 2022" --until "Jul 11 2022" --format="%H %d %s" --reverse | grep 'release/pcapulseservices to uat' > ~/Desktop/JuneReleasePJM.tx
        # last merge PCAPULSESERVICES-3215: Merge pull request #2536
        */
        const output = await execAsync(getLogCmd)
        // const output2 = await execAsync(getLogCmd2)

        const all = [...output.stdout.split('\n').filter(x => x)]
        // console.log(all)
        const commands = all.map(l => ({
            command: `git cherry-pick -X theirs --no-commit -m 1 ${l.split(' ')[0]}`,
            // @ts-ignore
            message: messageRegex.exec(l) != null ? messageRegex.exec(l)[0] : ""
        }));

        
        for (const item of commands) {
            logger.info(item.message)
            await execAsync(item.command)
        }
    } catch (error) {
     logger.error(error)   
    }

    await execAsync(`find . -path "./payment-config/**" | xargs git reset -q HEAD --`)
    await execAsync(`find . -path "**/leads/**" | xargs git reset -q HEAD --`)
    await execAsync(`find . -path "**/web/**" | xargs git reset -q HEAD --`)
    await execAsync(`find . -path "./products/cambodia/**/product-customization-page.jsonc" | xargs git reset -q HEAD --`)
    await execAsync(`find . -path "./products/**/profile-page.jsonc" | xargs git reset -q HEAD --`)


}


// await cherryPickPjm();
