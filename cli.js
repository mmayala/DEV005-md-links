const {mdLinks} = require('./index.js'); 

console.log(process.argv)
const path = process.argv[2]
const validate = process.argv.filter((arg) => {
return arg === '--validate'
}).length > 0
const stats = process.argv.filter((arg) =>{  
return arg === '--stats'
}).length > 0

const options = {
    validate: validate,
    stats: stats,
}
mdLinks(path, options)
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.error("Error", error);
  });

/*mdLinks('Pruebas',process.argv[2])
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.error("Error", error);
  });*/

//path.isAbsolute(ruta)
//path.resolve(ruta)