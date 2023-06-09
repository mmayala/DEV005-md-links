const fs = require("fs");
const path = require("path");

const {
  isRouteAbsolute,
  existsRoute,
  getArrayMds,
  extractLinks,
  readMds,
  getValidateMdLinks,
  statValidate,
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
          if(options.validate) {
            const promises = res.map(getValidateMdLinks);
            return Promise.all(promises)
          }
          return res;
        })
        .then((stats) => {
          if(options.stats){
            const result = statValidate (stats, options.validate);
            resolve (result);
          }else{
            resolve  (stats);

          }
         
        })

        .catch((error) => {
          console.error(error);
          reject(error);
        });      
    } else {
      reject("La ruta no es archivo md ni un directorio");
    }

  });
};


module.exports = {
  mdLinks,
};
