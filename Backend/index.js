import app from './app.js'
import './database.js'

//Creamos la funcion
//Que se encarga de ejecutar el servidor
async function main() {
    app.listen(4000)
}

main();


