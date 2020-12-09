var fs = require('fs');
var join = require('path').join;

function getJsonFiles(jsonPath) {
  let jsonFiles = [];
  function findJsonFile(path) {
    if (/^\./.test(path) || /\/\./.test(path) || /\/node_modules\//.test(path)) {
      return
    }
    console.log('path', path)
    let files = fs.readdirSync(path);
    files.forEach(function (item) {
      let fPath = join(path, item);
      let stat = fs.statSync(fPath);
      if (stat.isDirectory() === true) {
        findJsonFile(fPath);
      }
      if (stat.isFile() === true) {
        jsonFiles.push(fPath);
      }
    });
  }
  findJsonFile(jsonPath);
  console.log(jsonFiles)
  return jsonFiles
}

getJsonFiles(__dirname);
