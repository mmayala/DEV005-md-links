const fs = require('fs');
const {isRouteAbsolute, existsRoute, isFile, extractlinks} = require('./readfile.js')
const mdLinks = (userPath, options) => {
  return new Promise((resolve, reject) => {
    // Validar si la ruta existe
   
    if (existsRoute(userPath)) {
    
      // Chequear o convertir a una ruta absoluta
      const absolutePath = isRouteAbsolute(userPath);
     //console.log(absolutePath);

      // Probar si la ruta es archivo md
      isFile(absolutePath)
        .then((result) => {
          if (result) {
            fs.readFile(absolutePath, 'utf8',(err,data) =>{
              if(err){
                console.log('Error al leer el archivo:', err);
                reject(err);
                return;
              }
              const links = extractlinks(data);
              resolve(links);
            });
          } else{
            console.log('No es un archivo .md');
            resolve ([]);
          }
          
        })
        .catch((error) => {
          console.error('Error:', error);
          reject(error);
        });
      }else{
        reject('La ruta no existe')
      }
    
  });
};


  //Si es un directorio filtar los archivos md

mdLinks('README.md')
.then((links) =>{
  console.log('Enlaces encontrados:', links);
})
.catch((error) =>{
  console.error('Error', error);
});

module.exports = {
  mdLinks
};

