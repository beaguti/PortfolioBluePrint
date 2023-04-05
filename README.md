# PortfolioBluePrint

#################################################################################################################
#######################################     INSTALACION DEL PROYECTO    #########################################
#################################################################################################################
    1)Lanzar en la consola el comando npm i --force
    2)Al terminar, entrar en la carpeta node_modules, dentro de esta en la carpeta @types y cambiar de nombre la carpeta plotly.js a plotly.js-dist

#################################################################################################################
#######################################     OBTENCION DE DATOS    ###############################################
#################################################################################################################
    1)Crear una cuenta en firebase con autenticacion, storage y firestore database
    2)en firestore database, crear una tabla Infos con los datos, estos datos (menos id) pueden estar vacios o con un golpe de teclado:
        descripcion: STRING
        id: STRING (mismo que el nombre del documento)
        imgUrl: STRING 
        nombre: STRING
        pdfCV: STRING
        subtitulo: STRING
    3)En la carpeta environments (entro de src), añadir en los archivos de dentro la cadena de datos de firebase en las variables environment:
        ex:
        export const environment = {
        production: ,
        //añadir esto
        firebase: {
            apiKey: "xxxxxxxx-xxxxxxxx",
            authDomain: "xxxxxxxxxxxxxxxxxxxxxxxx",
            databaseURL: "xxxxxxxxxxxxxxxxxxxxxxxx",
            projectId: "xxxxxxxx",
            storageBucket: "xxxxxxxx",
            messagingSenderId: "xxxxxx",
            appId: "xxxxx",
            measurementId: "xxxxxxxxxxxxxxxx"
        }
        };

#################################################################################################################
#######################################     AÑADIR ICONOS     ###################################################
#################################################################################################################
La libreria de iconos usada es https://fontawesome.com/icons pero solo estan icluidos free y brands, ya que estos son los gratuitos, para poner el icono deseado solo copia el codigo de este. Si lo que se quiere es cambiar el icono de los links, copia el nombre de la clase.

#################################################################################################################
#######################################     USAR EL PORTFOLIO SOLO PARA ARTE     ################################
#################################################################################################################
Este porfolio es un portfolio mixto, esdecir, sirve para 2 demografias, la artistica y una mas tradicional. Para usarlo para la rama artistica (zona de galeria de imagenes) deberemos eliminar todo rastro de la tardicional:
    1)Eliminar en services, la carepta project
    2)En la carpeta src:
        2.1) dentro de pages:
            2.1.1) eliminar las carpetas project-info y project-list
            2.1.2) eliminar la linea 25, 26, 6 y 7 del archivo pages.module.ts
            2.1.3) eliminar de la linea 20 a la 30 (incluidas) en el archivo pages-routing.module.ts
            2.1.4) eliminar la linea 15 de pages.component.html
            2.1.5) en la carpeta home, eliminar de la linea 12 a la 16 (incluidas) y 37 a 39 (incluidas) en el archivo home.component.html
        2.2) dentro de edit:
            2.2.1) eliminar la carpeta edit-projects
            2.2.2) en el archivo edit.module.ts eliminar las lienas 23 y 11
            2.2.3) en el archivo edit.component.ts eliminar de la linea 45 a 54( ambas incluidas), la linea 15 y 12
            2.2.4) en el archivo edit.component.html eliminar linea 8 a 10 (incluidas) y 19 a 21 (incluidas)

#################################################################################################################
#######################################     USAR EL PORTFOLIO SOLO PARA PROYECTOS    ############################
#################################################################################################################
Este porfolio es un portfolio mixto, esdecir, sirve para 2 demografias, la artistica y una mas tradicional. Para usarlo para la rama tradiconal (zona de proyectos) deberemos eliminar todo rastro de la artistica:
    1)Eliminar en services, la carepta art
    2)En la carpeta src:
        2.1) dentro de pages:
            2.1.1) eliminar las carpetas art-album, art-album-list y art-image
            2.1.2) eliminar la linea 27, 28, 29, 8, 9 y 10 del archivo pages.module.ts
            2.1.3) eliminar de la linea 31 a la 46 (incluidas) en el archivo pages-routing.module.ts
            2.1.4) eliminar la linea 16 de pages.component.html
            2.1.5) en la carpeta home, eliminar de la linea 17 a la 22 (incluidas) y 37 a 39 (incluidas) en el archivo home.component.html
        2.2) dentro de edit:
            2.2.1) eliminar la carpeta edit-art
            2.2.2) en el archivo edit.module.ts eliminar las lienas 24 y 12
            2.2.3) en el archivo edit.component.ts eliminar de la linea 56 a 65( ambas incluidas), la linea 16 y 13
            2.2.4) en el archivo edit.component.html eliminar linea 11 a 13 (incluidas) y 22 a 24 (incluidas)
