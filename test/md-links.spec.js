const {mdLinks} = require('../index.js');
const { existsRoute } = require('../readfile.js');


describe('mdLinks', () => {

  it('Debe rechazar cuando el path no existe', () =>{
    return mdLinks('Pruebas/pruebaa.txt').catch((error) =>{
      expect(error).toBe('La ruta no es archivo md ni un directorio')
    })
  })

});
describe ('existsRoute', () => {
  it('Debe validar si una ruta existe', () =>{
  const userPath = 'README.md';
  const exists = existsRoute(userPath);
  expect(exists).toBe(true);
   });
});