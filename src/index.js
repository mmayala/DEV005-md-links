const fs = require("fs");
const path = require("path");

const {
  isRouteAbsolute,
  existsRoute,
  getArrayMds,
  extractLinks,
  readMds,
  getValidateMdLinks
} = require("./readfile.js");


/* -------------- Función Md Links --------------*/
const mdLinks = (userPath, options) => {
  return new Promise((resolve, reject) => {
    // Validar si la ruta existe
    if (existsRoute(userPath)) {
      // Chequear o convertir a una ruta absoluta
      const absolutePath = isRouteAbsolute(userPath);

      // Probar si la ruta es archivo md o directorio
      const arrMds = getArrayMds(absolutePath);    
     
      readMds(arrMds)
      //flat para eliminar un arr dentro de otro arr
        .then((arrObjLinks) => (arrObjLinks.flat()))
        
        .then((res) =>{
          //si pasa opcion --validate
          //console.log( 'esto es option:', options)
          if(options) {
            const promises = res.map(getValidateMdLinks);
            return Promise.all(promises)
          }
          return res;
        })

        .then((result) =>{
          resolve (result);
        })
        .catch((error) => {
          console.error("Error:", error);
          reject(error);
        });      
    } else {
      reject("La ruta no es archivo md ni un directorio");
    }

  });
};
  




mdLinks('Pruebas', process.argv[2])
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.error("Error", error);
  });

module.exports = {
  mdLinks,
};
