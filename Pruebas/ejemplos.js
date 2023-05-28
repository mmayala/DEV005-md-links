/*const arrarSum = process.argv
let numeros = 0;
//console.log(numeros);
for(let i=2; i<arrarSum.length; i++){
    numeros += Number (arrarSum[i]);
   

}
console.log(numeros);*/

const fs = require('fs')
 //const route = fs.readFileSync(process.argv[2], 'utf-8').toString().split('\n').length-1;
 const route = fs.readFileSync(process.argv[2], 'utf8').split('\n').length-1;
 //const route = fs.readFileSync('./textoprueba.txt');
 console.log(route);
