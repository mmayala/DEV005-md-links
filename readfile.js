const fs = require('fs');
const path = require('path');


//Validar si existe una ruta
const existsRoute = (userPath) => {
  if(fs.existsSync(userPath)){
    console.log('La ruta existe')
    return true
  } else {
    console.log('La ruta no existe');
  return false
  }
  
  };



//Validar si es ruta absoluta, si no lo es convertir en absoluta
const isRouteAbsolute = (userPath) => {
if(path.isAbsolute(userPath)){
  return userPath;
} else {
  return path.resolve(userPath);
}
};

const isFile =  (userPath) => {
  return new Promise((resolve, reject) => {
    fs.stat(userPath, (err, stats) => {
      if( !err ){
        if(stats.isFile()){
            const extensionfile = path.extname(userPath);
            const isFileMd = (extensionfile === '.md');
            console.log(`Es un archivo .md ? ${isFileMd}`);
            fs.readFile(userPath,'utf8', (err, data) => {
            if (err){
              console.log('Archivo no existe')
              return;
            }
            const links = extractlinks(data);
            resolve(links);
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
const extractlinks = (data) =>{
  const pattern = /\[.*?\]\((.*?)\)/g;
  const links = [];
  let match;
  while ((match = pattern.exec(data)) !== null){
    links.push(match[1]);
  }
  return links;

};
module.exports = {
  isRouteAbsolute,
  existsRoute,
  isFile,
  extractlinks,
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