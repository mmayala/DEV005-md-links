const {mdLinks} = require('./index.js');
mdLinks('/noexiste/').then(() => {})
.catch((error) => {
    console.log(error)
})

path.isAbsolute(ruta)
path.resolve(ruta)