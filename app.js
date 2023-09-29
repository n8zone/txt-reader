const fs = require('fs');
const util = require('util')
// time to over engineer
let password = ''

let acceptableFiles = []
let readDataCallback = (err, contents) => {
  if (err) {
    console.log(`Something went wrong: ${err}`)
  } else {
    console.log('-- FILE CONTENTS --')
    console.log('\n')
    console.log(contents)
    console.log('\n')
    console.log('------- END -------')    
  }
}

let readUserInput = (data) => {
    let file = ''
    let trimmedData = data.toString().trim();
    let isNumber = !isNaN(+trimmedData)

    if (trimmedData === 'lf') {
      console.log('-- Possible Files --')
      console.table(acceptableFiles)
      return
    }
    
    if (isNumber) {
      file = `./files/${acceptableFiles[+trimmedData]}`
    } else {
      console.log('not num!')
      if (trimmedData.includes('txt')) {
        file = `./files/${trimmedData}`
      } else {
        file = `./files/${trimmedData}.txt`
      }
    }

    fs.readFile(file, 'utf-8', readDataCallback)
}

fs.readdir('./files', (err, files) => {

  if ( password === 'timsux4') { // cheating isn't nice don't read this if you havent solved it or i'll be upset
    console.log("Wow! Thank you so much for finding my password! And thanks for not reading my diary!")
    console.log("You win.")
  }
  if (err) {
    console.error("An error has occured:", err)
  } else {
    acceptableFiles = files.filter((file) => {
      return file.includes('.txt')
    })
    console.log('-- Possible Files --')
    console.table(acceptableFiles)
    console.log("Enter a file name or index to begin.")
    console.log("Press LF to relist files at any time")
  }
})


let f = process.stdin.on('data', readUserInput)
