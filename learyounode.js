const fs = require('fs');
const path = require('path');
//Read a file
const file = fs.readFile('Pruebas/prueba.txt','utf8', (err,data) => {
    if (err){
        console.error('La ruta no existe')
        return
    }
    console.log(data);
});


// Read file extension

const readPath = 'Pruebas/textoprueba.txt';
const extension = path.extname(readPath)
console.log(extension); // Returns: '.txt'

//Validar si es ruta absoluta
const isRouteAbsolute = (route) => {
if(path.isAbsolute(route)){
  return route
  //Si no es ruta absoluta convertir en ruta absoluta
} else {
  return path.resolve(route);
}
//console.log(isRouteAbsolute);
};




// Read directory
const directory = 'C:/Users/danni/OneDrive/Documents/PROYECTOS LABORATORIA/MD LINKS/DEV005-md-links/Pruebas'
try {
    const dir = fs.readdirSync(directory);
      console.log(dir);
  } catch (err) {
    console.error('El archivo no existe');
  } 

//Join two routes
const route1 = 'Pruebas/ejemplos.js';
const route2 = 'Pruebas/textoprueba.txt';

const joinTwo = path.join(route1,route2);
console.log(joinTwo);

module.exports = {
  isRouteAbsolute,
};