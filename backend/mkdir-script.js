const fs = require('fs');
const dir1 = './images';
const dir2 = './images/posts';
const dir3 = './images/users';

console.log('Launching mkdir-script')

if (!fs.existsSync(dir1)){
    fs.mkdirSync(dir1);
}
if (!fs.existsSync(dir2)){
    fs.mkdirSync(dir2);
}
if (!fs.existsSync(dir3)){
    fs.mkdirSync(dir3);
}