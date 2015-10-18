/*
	CalificaEmpresas. Aplicación de ejemplo para los ejercicios del tema 1 de
  Cloud Computing del Máster Universitario en Ingeniería Informática.
	Copyright (C) 2015 Germán Martínez Maldonado

	This file is part of CalificaEmpresas.

	CalificaEmpresas is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	CalificaEmpresas is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

// Dependencias
var express = require('express');
var http = require('http');
var path = require('path');

// Rutas
var index = require(__dirname + '/routes/index');

// Crea aplicación web con Express
var app = express();

// Funcionalidades
app.get('/', index.index);
app.get('/crearEmpresa/:empresa', index.crearEmpresa);
app.get('/listarCalificaciones/:empresa', index.listarCalificaciones)
app.get('/crearCalificacion/:empresa/:alumno/:calificacion', index.crearCalificacion);
app.get('/borrarCalificacion/:empresa/:alumno', index.borrarCalificacion);
app.get('/actualizarCalificacion/:empresa/:alumno/:calificacion', index.actualizarCalificacion);
app.get('/generarRanking', index.generarRanking);

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
//Página de error
app.use(function(req, res, next) {
  res.status(404).render('index', {
    mensaje: 'Error 404: Página no encontrada o parámetros inválidos.'
  });
});

// Creación del servidor
http.createServer(app).listen(app.get('port'), app.get('ip'), function() {
  console.log('Servidor Express escuchando en ' + app.get('ip') + ':' + app.get('port'));
});
