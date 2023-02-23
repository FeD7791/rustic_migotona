const express = require('express');
const app = express();
const PORT = 3000;

//VIEWS
app.set('view engine','ejs'); //Se fija ejs como el motor para las vistas
app.set('views' , __dirname + '/views'); //Se fija una ruta dinamica (con __dirname)

//STATIC FILES
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/scripts_js', express.static(__dirname + 'public/scripts_js'))

//Rutas de las vistas web
app.use('/', require('./routes/rutas_web'))
//Rutas de los productos
app.use('/products',require('./routes/rutas_productos'))

//Listen port
app.listen(PORT , ()=> console.log('listening on port',PORT));