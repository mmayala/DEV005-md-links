const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");


//Validar si existe una ruta

const existsRoute = (userPath) => {
  if (fs.existsSync(userPath)) {
    //console.log("La ruta existe");
    return true;
  } else {
    console.log("La ruta no existe");
    return false;
  }
};

//Validar si es ruta absoluta, si no lo es convertir en absoluta
const isRouteAbsolute = (userPath) => {
  if (path.isAbsolute(userPath)) {
    return userPath;
  } else {
    return path.resolve(userPath);
  }
};
//Leer un archivo o directorio de forma recursiva
const getArrayMds = (userPath) => {
  let arrayFiles = [];
  const stats = fs.statSync(userPath);
  if (stats.isFile()) {
    arrayFiles.push(userPath);
  } else {
    //Leer un directorio
    const elements = fs.readdirSync(userPath);
    elements.forEach((element) => {
      const pathChild = path.join(userPath, element);
      if (fs.statSync(pathChild).isFile()) {
        arrayFiles.push(pathChild);
      } else {
        arrayFiles = arrayFiles.concat(getArrayMds(pathChild));
      }
    });
  }
  return arrayFiles.filter((file) => path.extname(file) === ".md");
};
//Función para extraer los links con expresión regular exec
const extractLinks = (data, pathMds) => {
  //const mds =  getArrayMds(data);
  const regex = /\[([^\[]+)\](\(.*\))/gm;
  const links = [];
  //console.log(regex);
  let match;

  while ((match = regex.exec(data)) !== null) {
    const textLinks = match[1];
    const urlsLinks = match[2].substring(1, match[2].length - 1);
    console.log(urlsLinks);
    const filePath = pathMds;
    //console.log(route);
    links.push({ href: urlsLinks, text: textLinks,  file: filePath });
  }
  return links;
};
const readMds = (arrayMds) => {
  const arrayLinks = arrayMds.map((md) => {
    return new Promise((resolve, reject) => {
      fs.readFile(md, "utf8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          //Se extrae los links por medio de la función extractLinks
          const links = extractLinks(data, md);
          resolve(links);
        }
      });
    });
  });
  return Promise.all(arrayLinks);
};

const getValidateMdLinks = (linksObject) =>{
  //console.log(linksObject);
return fetch (linksObject.href)
.then((response) => {
  //console.log(response.status);
  return {...linksObject, status: response.status, ok: true}
})
.catch((err) => {
  let status = 404;
  console.log(status);
  if(err.response){
    status = err.response.status;
  }
  return {...linksObject, status, ok: false}

});
};
/*getValidateMdLinks ({
  href: 'https://www.youtube.com/watch?v=FylpygEYYbE',
   text: 'mi musica favorita vallenato',
   file: 'C:User//s//danni//OneDrive//Documents//PROYECTOS LABORATORIA//MD LINKS//DEV005-md-links//Pruebas//prueba2//ejemplo.md'
   
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
*/
  
/*array de objetos resuktado de readMds
declarar la funcion validar 
probar en mdLinks con .then 
si urlToHttpOptions.validate resuelve  resultado de la function validate 
y si no resuelve result. flat*/


module.exports = {
  isRouteAbsolute,
  existsRoute,
  getArrayMds,
  extractLinks,
  readMds,
  getValidateMdLinks,
};
