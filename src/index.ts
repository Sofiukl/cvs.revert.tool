import {readFile} from 'fs';
import {execSync} from 'child_process';
import * as readline from 'readline';


process.on('uncaughtException', (err) => {
    console.log(err);
})

let content: string = '';

let restoreToVesion: string = '';
let restoreFromVersion: string = '';

let readFromCvs = async () => {
    let cvsLog = execSync('cvs -q log -NS -rBR-GV-FOR-THAGMO-PROD-REL-20-06062018 MarginValuationService.java').toString();
    console.log(cvsLog);
    const currentCheckins: any = parseCVSLog(cvsLog);
    console.log(`current checkins: ${currentCheckins}`)
  
    restoreFromVersion = currentCheckins[0]['revision'];
    console.log(`restore from revision: ${restoreFromVersion}`);

    let replaceChoice = 'N'

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question(`Do you want to replce from version ${restoreFromVersion} (Y/N)? `, (answer) => {
        console.log(`Your answere: ${answer}`);
        replaceChoice = answer;

        rl.close();
    });

    if(replaceChoice == null || replaceChoice == '' || replaceChoice == 'N' || replaceChoice == 'No' ){
        console.log('File is not restored to prev version as requested by You')
    }else if(replaceChoice == 'Y' || replaceChoice == 'Yes') {
        //TODO continue with restoration
    }

}

let readRestoreToVersion = () => {
    
    try {
        let cvsRestoreToLog = execSync('cvs -q log -NS -rBR-GV-FOR-THAGMO-PROD-REL-20-06062018 MarginValuationService.java').toString();
        const revisions: any = parseCVSLog(cvsRestoreToLog);
       
         //TODO Retrive the version and display
         restoreToVesion = revisions[0]['revision'];
         console.log(`restore to revision: ${restoreToVesion}`);
        
    } catch(err){
        console.log(err);
    }
    
}

let parseCVSLog = (log: string) => {

    if(!log || log == null){
        console.log('[Info] No version of the mentioned file is tagged');
    }else {
        const start = content.indexOf('description');
        const checkInfo = content.substring(start);

        console.log(checkInfo);

        var wordsArray = content.split(/\s+/);
        console.log(wordsArray);
     
        let revArr: any = [];
 
        wordsArray.forEach((word, index) => {
            if( 'revision' == word ){
                let obj1: any = {};
                obj1[wordsArray[index]] = wordsArray[index+1];
                obj1[wordsArray[index+2]] = `${wordsArray[index+3]} ${wordsArray[index+4]}`;
                obj1[wordsArray[index+5]] = wordsArray[index+6];

                revArr.push(obj1);
            }
        })
 
        console.log(revArr)
        return revArr;
    }
}

readRestoreToVersion();
readFromCvs();