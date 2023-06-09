# Markdown Links

## Índice

* [1. Markdown Links](#1-Markdown-Links)
* [2. Descripción del proyecto](#2-Descripción-del-proyecto)
* [3. Instalación](#3-Instalación)
* [4. Uso de la Librería ](#4-Uso-de-la-Librería )
* [5. Criterios de aceptación mínimos del proyecto](#5-criterios-de-aceptación-mínimos-del-proyecto)
* [6. Entregables](#6-entregables)
* [7. Hacker edition](#7-hacker-edition)
* [8. Pistas, tips y lecturas complementarias](#8-pistas-tips-y-lecturas-complementarias)
* [9. Checklist](#9-checklist)
* [10. Achicando el problema](#10-achicando-el-problema)

***

## 1. Markdown Links

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado ligero muy popular entre developers. Es usado en muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, ...) y es muy común encontrar varios archivos en ese formato en cualquier tipo de repositorio (empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de la información que se quiere compartir.
## 2. Descripción del proyecto

En el presente proyecto se crea una librería con Node.js donde permite extraer, validar y generar estadísticas de los links(enlaces) de un archivo o directorio en formato .md.

## 3. Instalación

Para instalar la libreria se debe correr el siguiente comando:

* Desde consola:

* Desde Package.json:

## 4. Uso de la Librería
La librería ofrece dos opciones o argumentos para generar la validación y mostrar las estadísticas de los links.

mdLinks (path-to-file)[options]

* path: Ruta al archivo o directorio.
* options: Un objeto con la siguientes propiedades:validate y/o stats.

La librería ofrece la siguiente información:

* Nombre del archivo .md
* Total de links encontrados en el archivo.
* URL, texto del link y ruta donde se encuentra el link.
* Lista de links con url, texto, ruta de donde se encuentra, status y estado del link ok o fail.
* Links únicos, rotos y totales.

Para extraer los links sin opción se debe pasar el siguiente comando en consola:

`md-links  <path-to-file>`

Ejemplo:

```js
mdLinks-mmayala Pruebas/prueba2/ejemplo.md
{
    href: 'https://www.youtube.com/watch?v=FylpygEYYbE',
    text: 'mi musica favorita vallenato',
    file: 'C://Users//danni//OneDrive//Documents//PROYECTOS LABORATORIA//MD LINKS//DEV005-md-links//Pruebas//prueba2//ejemplo.md'
  }
```

## Opciones

### --validate

Se debe ingresar el siguiente comando para obtener la opción validate despues de la ruta y verificar los links.

`md-links <path-to-file --validate>`
mdLinks-mmayala Pruebas/prueba2/ejemplo.md --validate

Por ejemplo:

```sh
 {
    href: 'https://www.youtube.com/watch?v=FylpygEYYbE',
    text: 'mi musica favorita vallenato',
    file: 'C://Users//danni//OneDrive//Documents//PROYECTOS LABORATORIA//MD LINKS//DEV005-md-links//Pruebas//prueba2//ejemplo.md'
    status: 200,
    ok: true
  }
```
### --stats

Se debe ingresar el siguiente comando para obtener la opción stats despues de la ruta y obtener el total de los links y los unicos

`md-links <path-to-file --stats>`
mdLinks-mmayala Pruebas/prueba2/ejemplo.md --stats

Ejemplo:

```sh
 
    Total: 3
    Unique: 3
```
### --stats y --validates

Se debe ingresar los siguientes comandos para obtener la opción stats y validate y/o(viceversa) despues de la ruta y obtener el total de links, los unicos y los inválidos.

`md-links <path-to-file --stats --validate>`
mdLinks-mmayala Pruebas/prueba2/ejemplo.md --stats --validate
mdLinks-mmayala Pruebas/prueba2/ejemplo.md --validate --stats

Ejemplo:

```sh
 
     Total: 3
    Unique: 3
    Broken: 1
```

## Diagrama de Flujo
Se incluye el diagrama de flujo con el cual se realizó paso a paso el siguiente proyecto para una mejor comprensión de los usuarios.

![Diagrama de Flujo mdLinks](<Diagrama PATH - Página 1.png>)