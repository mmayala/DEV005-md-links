const fs = require('fs');
const { mdLinks } = require("../index.js");
const {
  existsRoute,
  isRouteAbsolute,
  getArrayMds,
  extractLinks,
  readMds,
  getValidateMdLinks,
  statValidate,
} = require("../readfile.js");

describe("mdLinks", () => {
  //Test que rechaza la promesa cuando la ruta no existe
  it("Debe rechazar cuando el path no existe", () => {
    return mdLinks("Pruebas/pruebaa.txt").catch((error) => {
      expect(error).toBe("La ruta no es archivo md ni un directorio");
    });
  });

  it("Debería probar una ruta valida para el archivo md", () => {
    const userPath = "Pruebas/prueba2/ejemplo.md";
    const options = {};
    const expectedOutput = [
        {
            href: "https://www.youtube.com/watch?v=FylpygEYYbE", 
            text: "mi musica favorita vallenato",
            file: "C:/Users/danni/OneDrive/Documents/PROYECTOS LABORATORIA/MD LINKS/DEV005-md-links/Pruebas/prueba2/ejemplo.md",
        }
    ];
    return mdLinks(userPath, options).then((result) => {
        expect(result).toEqual(expectedOutput);
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

/*describe("extractLinks", () => {
  it("Debería delvolver los enlaces encontrados con formato href,text y file en la ruta de Prueba",  () => {
    const route = "Pruebas";
    const urls = [
      {
        href: "https://github.com/mmayala",
        text: "Hola soy Martha",
        file: "C:/Users/danni/OneDrive/Documents/PROYECTOS LABORATORIA/MD LINKS/DEV005-md-links/Pruebas/textoprueba.md",
      },
    ];
    const extract = extractLinks(route)
      expect(extract).toEqual(urls);
      
  });

  it("Debería delvolver los enlaces encontrados con formato href,text y file en la ruta de Prueba",  () => {
    const route = "Pruebas";
    const urls = extractLinks(route);
    expect(urls).toEqual(urls);
  });
});*/


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
  

    
   
 


  /*it("test_reading_one_md_file_successfully", async () => {
        const result = await readMds(["./test/testFiles/test1.md"]);
        expect(result).toEqual([[{ href: 'https://www.google.com', text: 'Google', file: './test/testFiles/test1.md' }]]);
    });*/