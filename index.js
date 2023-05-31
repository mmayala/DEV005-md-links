const fs = require("fs");
const path = require("path");
const {
  isRouteAbsolute,
  existsRoute,
  getArrayMds,
  extractLinks,
  readMds,
} = require("./readfile.js");

const mdLinks = (userPath, options) => {
  return new Promise((resolve, reject) => {
    // Validar si la ruta existe
    if (existsRoute(userPath)) {
      // Chequear o convertir a una ruta absoluta
      const absolutePath = isRouteAbsolute(userPath);

      // Probar si la ruta es archivo md o directorio
      const arrMds = getArrayMds(absolutePath);
      readMds(arrMds)
        .then((arrayMds) => {
          const links = arrayMds.flat();
          resolve(links);
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

mdLinks("Pruebas")
  .then((links) => {
    console.log("Enlaces encontrados:", links.length);
  })
  .catch((error) => {
    console.error("Error", error);
  });

module.exports = {
  mdLinks,
};
