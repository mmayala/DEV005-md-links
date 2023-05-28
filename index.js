const fs = require('fs');
const {isRouteAbsolute, existsRoute, isFileDirec} = require('./readfile.js')
const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    // Validar si la ruta existe
   
    if (existsRoute(path)) {
    } else {
      reject('La ruta no existe');
      return;
    }
      // Chequear o convertir a una ruta absoluta
      const absolutePath = isRouteAbsolute(path);
     //console.log(absolutePath);

      // Probar si la ruta es archivo md
      isFileDirec(absolutePath)
        .then((result) => {
          if (result) {
            //console.log('Es un archivo .md');
          } 
          resolve(absolutePath);
        })
        .catch((error) => {
          console.error('Error:', error);
          reject(error);
        });
    
  });
};

  //Si es un directorio filtar los archivos md

mdLinks('README.md');

module.exports = {
  mdLinks
};

