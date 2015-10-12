// Dependencias
var express = require('express');
var http = require('http');
var path = require('path');

// Rutas
var index = require(__dirname+'/routes/index');

// Crea aplicación web con Express
var app = express();

// Página de inicio
app.get('/', index.index);
app.get('/index.html', index.index);
// Página para crear empresa
app.get('/crearEmpresa',index.crearEmpresa);

app.get('/listarTodo',index.listarTodo);

app.get('/crearCalificacion',index.crearCalificacion);

// Variables de entorno
app.set('port', process.env.PORT || 3000);
app.set('ip', process.env.IP || '127.0.0.1');
// Directorio con las plantillas
app.set('views', path.join(__dirname, 'views'));
// Motor de visualización
app.set('view engine', 'jade');

//Favicon
app.use(express.favicon(path.join(__dirname, 'public/images/favicon.ico')));
//Logger de solicitudes HTTP
app.use(express.logger('dev'));
//Manejador de enrutado
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Creación del servidor
http.createServer(app).listen(app.get('port'), app.get('ip'), function(){
  console.log('Servidor Express escuchando en ' + app.get('ip') + ':' + app.get('port'));
});
