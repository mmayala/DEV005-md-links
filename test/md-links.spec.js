const fs = require('fs');
const { mdLinks } = require("../index.js");
const path = require('path')
const {
  existsRoute,
  isRouteAbsolute,
  getArrayMds,
  extractLinks,
  readMds,
  getValidateMdLinks,
  statValidate,
} = require("../readfile.js");


//Test función mdLinks
describe("mdLinks", () => {
  it('Deberia ser una función', () => {
    expect(typeof mdLinks).toBe('function');
  });

  
  it("Debe rechazar la promesa cuando el path no existe", () => {
    return mdLinks("Pruebas/pruebaa.txt").catch((error) => {
      expect(error).toBe("La ruta no es archivo md ni un directorio");
    });
  });

  it('Debe devolver un objeto con enlaces para un archivo md valido', (done) => {
    const userPath = 'Pruebas/prueba2/ejemplo1.md';
    const options = { validate: true, stats: false };

    mdLinks(userPath, options)
    .then((result) => {
    
      expect(result).toEqual([
        {
          href: 'https://www.youtube.com/watch?v=FylpygEYYbE',
          text: 'mi musica favorita vallenato',
          file: path.normalize('C:/Users/danni/OneDrive/Documents/PROYECTOS LABORATORIA/MD LINKS/DEV005-md-links/Pruebas/prueba2/ejemplo1.md'),
          status: 200,
          ok: true
        }
      ]);
      done();
    })
    .catch((error) =>{
      console.error(error);
      done(error);
    });
  });
});

//Test para validar si una ruta existe
describe("existsRoute", () => {
  it("Debe validar si una ruta existe", () => {
    const userPath = "README.md";
    const exists = existsRoute(userPath);
    expect(exists).toBe(true);
  });
});

//Test para verificar si la ruta es absoluta
describe("isRouteAbsolute", () => {
  it("Debería devolver la misma ruta absoluta de prueba", () => {
    const userPath =
      "C:/Users/danni/OneDrive/Documents/PROYECTOS LABORATORIA/MD LINKS/DEV005-md-links/Pruebas";
    expect(isRouteAbsolute(userPath)).toBe(userPath);
  });
});


//Test de la función getArrayMds
describe("getArrayMds", () => {
  it("Debería retornar un array si es un  archivo md", () => {
    const isFile =
      "C:/Users/danni/OneDrive/Documents/PROYECTOS LABORATORIA/MD LINKS/DEV005-md-links/Pruebas/textoprueba.md";
    const result = getArrayMds(isFile);
    expect(Array.isArray(result)).toBe(true);
  });
  it("Deberia retornar error cuando la ruta no sea directorio", () => {
    const notDirectory = "Pruebas/src";
    expect(() => {
      getArrayMds(notDirectory);
    }).toThrowError();
  });
});

//Test de la función extractLinks
describe("extractLinks", () => {
  it("Debería delvolver los enlaces encontrados con formato href,text y file en la ruta de Prueba",  () => {
    const data = `Esto es una prueba [Hola soy Martha](https://github.com/mmayala)
                  Aquí hay otra prueba [Está página es del Comil](https://idukay.net/#/my_resources)`;

    const pathMds = 'Pruebas/textoprueba.md';
    const expectedLinks = [
      {
        href: "https://github.com/mmayala",
        text: "Hola soy Martha",
        file: 'Pruebas/textoprueba.md',
      },
      {
        href: "https://idukay.net/#/my_resources",
        text: "Está página es del Comil",
        file: 'Pruebas/textoprueba.md',
      },
    ];
    const extract = extractLinks(data, pathMds);
      expect(extract).toEqual(expectedLinks);
      
  });

  it('Debería retornar un string sin enlaces', () =>{
    const route = 'Este es una cadena de prueba sin enlaces';
    const pathMd ='ejemplo.md'
    const result = extractLinks(route, pathMd);
    expect(result).toEqual([])
  });
});

//Test de la función getValidateMdLinks
  describe('getValidateMdLinks', () => {

    it("Debería retornar enlaces validos de un objeto con prueba exitosa", async () => {
      const linksObject = {
          href: "https://www.google.com",
          text: "Google"
      };
      const expectedOutput = {
          href: "https://www.google.com",
          text: "Google",
          status: 200,
          ok: true
      };
      const result =  await getValidateMdLinks(linksObject);
      expect(result).toEqual(expectedOutput);
  });

  //En este test se utiliza mockRejectValue que es útil para crear funciones simuladas asincronas que siempre rechazarán
  it("Debería retornar diferentes tipos de errores en catch", async () => {
    const linksObject = {
        href: "https://www.google.com/notfound",
        text: "Google"
    };
    const mockError = new Error("Mock error");
    const mockResponse = {
        status: 500
    };
    const mockFetch = jest.fn().mockRejectedValue(mockError);
    const result = await getValidateMdLinks(linksObject, mockFetch);
    expect(result.status).toEqual(404);
    expect(result.ok).toEqual(false);
});

  });
//Test de la función statValidate
  describe ('statValidate', () => {
    
    it("Deberia retornar enlaces validos con los Totales y Únicos", () => {
      const linksArr = [
          { href: "https://www.google.com", ok: true },
          { href: "https://www.facebook.com", ok: true },
          { href: "https://www.twitter.com", ok: true }
      ];
      const isValidate = true;
      const expectedOutput = "Total: 3\nUnique: 3\n    Broken: 0";
      expect(statValidate(linksArr, isValidate)).toContain("Total: 3");
      expect(statValidate(linksArr, isValidate)).toContain("Unique: 3");
  });
    });
  

    
  