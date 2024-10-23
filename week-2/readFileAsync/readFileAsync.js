const fs = require('fs');

function readFileAsync(path, encoding) {
    return new Promise((resolve, reject) => fs.readFile(path, encoding, function(err, data) {
        if(err) {
            return reject(err)
        }
        resolve(data);
    }));
}

readFileAsync('a.txt', 'utf-8')
.then(data => {
    console.log(data); 
})
.catch(err => {
    console.log("error is : ", err);
})