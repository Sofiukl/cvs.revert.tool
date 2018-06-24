let readline = require('readline');
let fs = require('fs');
let child = require('child_process');

process.on('uncaughtException', (err) => {
    console.log(err);
})

let fileName = '';
let prevVers = '';
let newVers = '';

const rl= readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question1 = () => {
    return new Promise((resolve, reject) => {
      rl.question('Enter the file name? ', (answer) => {
        fileName = answer;
        resolve();
      })
    })
  }
  
  const question2 = () => {
    return new Promise((resolve, reject) => {
      rl.question('Enter the new Version? ', (answer) => {
        newVers = answer;
        resolve();
      })
    })
  }

  const question3 = () => {
    return new Promise((resolve, reject) => {
      rl.question('Enter the previous version from where you want to restore? ', (answer) => {
        prevVers = answer;
        resolve();
      })
    })
  }

let readOptions = async  () => {
    await question1();
    await question2();
    await question3();
    rl.close();
}

let main = async () => {
    await readOptions();
    const oldFileName =  `${fileName}#${prevVers}.java`;
    console.log(`oldFileName: ${oldFileName}`);

    const checkoutPreVersion = `cvs update -r ${prevVers} -- ${fileName}`;
    const copytoTemp = `copy ${fileName} ${oldFileName}`;
    const checkoutLatestVer = `cvs update -A -- ${fileName}`;
    const replaceLatestVer = `copy ${oldFileName} ${fileName}`;
    const commitFile = `cvs commit -m "Reverting false commit" ${fileName}`;

    try {
        //1. checkout old version
        let checkoutPreVersionRes = child.execSync(checkoutPreVersion).toString();
        console.log(`Retrieving the new version from CVS:`);
        console.log(`${checkoutPreVersionRes}`);

        //2. copy the file in a temp file
        let copytoTempRes = child.execSync(copytoTemp).toString();
        console.log('copy the file in a temp file');
        console.log(copytoTempRes);

        //3. checkout latest version
        let checkoutLatestVerRes = child.execSync(checkoutLatestVer).toString();
        console.log(`Retrieving the old version from CVS:`);
        console.log(`${checkoutLatestVerRes}`);
        
        //4. replace the file with old content
        let replaceLatestVerRes = child.execSync(replaceLatestVer).toString();
        console.log('Replace the file with old content');
        console.log(replaceLatestVerRes);

        const rl5 = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        //5. commit the file
        rl5.question('Do you want to commit? (Y/N) ', (answer) => {
            if(answer == 'Yes' || answer == 'Y') {   
                let commitFileRes = child.execSync(commitFile).toString();
                console.log('commit log..');
                console.log(commitFileRes);
            }
            rl5.close();
        });

    } catch(err) {
        console.error(err);
    }
}

main();



