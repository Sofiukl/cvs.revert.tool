let fs = require('fs');
let execFile = require('child_process').execFile;


fs.readFile('./src/cvs.log.txt', 'utf-8', (err, content) => {
    if(err){
        throw err;
    }
   
   // console.log(content);

    if(!content && content == null){
        console.log('[INFO] No Check in on the mentioned branch/tag');
    }else{

       var wordsArray = content.split(/\s+/);

       console.log(wordsArray);
    
      let revArr = [];

      wordsArray.forEach((word, index) => {

          if( 'revision' == word ){
            let obj1 = {};
            obj1[wordsArray[index]] = wordsArray[index+1];
            obj1[wordsArray[index+2]] = `${wordsArray[index+3]} ${wordsArray[index+4]}`;
            obj1[wordsArray[index+5]] = wordsArray[index+6];

            revArr.push(obj1);
            
          }
      })

      console.log(revArr)

    }
})