import {readFile} from 'fs';
import {execFileSync} from 'child_process';
import * as readline from 'readline';


process.on('uncaughtException', (err) => {
    console.log(err);
})


const checkoutPreVersion = 'cvs update -r 1.5 -- ADPUtility.java';
const copytoTemp = 'copy ADPUtility.java ADPUtility#1.5.java'
const checkoutLatestVer = 'cvs update -A ADPUtility.java';
const replaceLatestVer = 'copy ADPUtility#1.5.java ADPUtility.java';
const commitFile = 'cvs commit -m "Reverting false commit"  ADPUtility.java';

let checkoutPreVersionRes = execFileSync(checkoutPreVersion);
console.log(checkoutPreVersionRes);

//let copytoTempRes = execFileSync('copytoTemp')
//let checkoutLatestVerRes = execFileSync('checkoutLatestVer');
//let replaceLatestVerRes = execFileSync('replaceLatestVer');
//let commitFileRes = execFileSync('commitFile');

//let checkoutPreVersionRes = child.exec(checkoutPreVersion);
// checkoutPreVersionRes.on('exit', (code, signal) => {
    // console.log('child process exited with ' +
          // `code ${code} and signal ${signal}`);

   // console.log('completed')

// })

// checkoutPreVersionRes.stderr.on('data', err => console.log('errrr: ' + err) )
// checkoutPreVersionRes.stdout.on('data', (data) => {
    
    // console.log('data');
    
    // if(!data && data == null){
        // console.log('[INFO] No Check in on the mentioned branch/tag');
    // }else{
        // console.log('received data '+ data);
    // }
// })