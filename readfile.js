const fs = require('fs');
const path = require('path');

//Validar si existe una ruta
const existsRoute = (route) => {
  if(fs.existsSync(route)){
    console.log('La ruta existe')
    return true
  } else {
    console.log('La ruta no existe');
  return false
  }
  
  };



//Validar si es ruta absoluta, si no lo es convertir en absoluta
const isRouteAbsolute = (route) => {
if(path.isAbsolute(route)){
  return route
  //Si no es ruta absoluta convertir en ruta absoluta
} else {
  return path.resolve(route);
}
//console.log(isRouteAbsolute);
};

const isFileDirec =  (route) => {
  return new Promise((resolve, reject) => {
    fs.stat(route, (err, stats) => {
      if( !err ){
        if(stats.isFile()){
            const extensionfile = path.extname(route);
            const isFileMd = (extensionfile === '.md');
            console.log(`Es un archivo .md ? ${isFileMd}`);
           const readFile = fs.readFile(route,'utf8', (err, data) => {
            if (err){
              console.log('Archivo no existe')
              return;
            }
            console.log(data);
           })
            resolve(isFileMd);
        }  else {
          const errorMessage = err? `No es un archivo: ${isFileMd}`:'no es md' ;
          const error = new Error(errorMessage)
          console.error('Error:', error);
          reject(error);
}
      }
});
  });
};


module.exports = {
  isRouteAbsolute,
  existsRoute,
  isFileDirec,
};

/*else if(stats.isDirectory()){
  console.log(`Es un directorio?  ${stats.isDirectory()}`);
  fs.readdir(route,(err,files) =>{
    if(err){
      reject(err);
      return;
    }
    console.log('Archivos del directorio:', files);
  resolve(false);
  })
  
}*/