const fs = require("fs");
const path = require("path");

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

    })
  }
  return arrayFiles.filter((file)=>path.extname(file) === ".md")
};

const extractLinks = (data) => {
  const pattern = /\[.*?\]\((.*?)\)/g;
  const links = [];
  let match;
  while ((match = pattern.exec(data)) !== null) {
    links.push(match[1]);
  }
  return links;
};

const readMds = (arrayMds) => {
 const arrayLinks = arrayMds.map((md)=>{
  return new Promise((resolve, reject) => {
    fs.readFile(md, "utf8", (err, data) => {
      
      if (err) {
        reject(err);
      } else{
        //Se extrae los links por medio de la función extractLinks
      const links = extractLinks(data);
      console.log(data);
      resolve(links);
      }
    });
  });
});
return Promise.all(arrayLinks)

};

//Función para extraer los links con expresión regular exec



module.exports = {
  isRouteAbsolute,
  existsRoute,
  getArrayMds,
  extractLinks,
  readMds,
};
