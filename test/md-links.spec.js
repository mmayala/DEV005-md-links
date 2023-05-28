const {mdLinks} = require('../index.js');


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
  /*it('Deberia devolver una promesa', () => {
    expect(mdLinks()).toBe(typeof Promise)
  });*/
  it('Debe rechazar cuando el path no existe', () =>{
    return mdLinks('Pruebas/pruebaa.txt').catch((error) =>{
      expect(error).toBe('La ruta no existe')
    })
  })

});
