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
var empresa = require('../models/empresa');

var procesaNombre = function(cadena) {
  cadena = cadena.replace(':', '');
  cadena = cadena.toUpperCase();
  return cadena;
}

//Pagina de inicio
exports.index = function(req, res) {
  res.render('index', {});
};

exports.crearEmpresa = function(req, res) {
  empresa.crearEmpresa({
    empresa: procesaNombre(req.params.empresa)
  }, function(error, data) {
    res.render('index', {
      mensaje: data
    });
  });
};

exports.listarCalificaciones = function(req, res) {
  var nombreEmpresa = procesaNombre(req.params.empresa);

  empresa.listarCalificaciones({
    empresa: nombreEmpresa
  }, function(error, data) {
    res.render('index', {
      empresa: nombreEmpresa,
      lista: data
    });
  });
};

exports.crearCalificacion = function(req, res) {
  empresa.crearCalificacion({
    empresa: procesaNombre(req.params.empresa),
    alumno: procesaNombre(req.params.alumno),
    calificacion: procesaNombre(req.params.calificacion)
  }, function(error, data) {
    res.render('index', {
      mensaje: data
    });
  });
};

exports.borrarCalificacion = function(req, res) {
  empresa.borrarCalificacion({
    empresa: procesaNombre(req.params.empresa),
    alumno: procesaNombre(req.params.alumno)
  }, function(error, data) {
    res.render('index', {
      mensaje: data
    });
  });
};

exports.actualizarCalificacion = function(req, res) {
  empresa.actualizarCalificacion({
    empresa: procesaNombre(req.params.empresa),
    alumno: procesaNombre(req.params.alumno),
    calificacion: procesaNombre(req.params.calificacion)
  }, function(error, data) {
    res.render('index', {
      mensaje: data
    });
  });
};

exports.generarRanking = function(req, res) {
  empresa.generarRanking(function(error, data) {
    res.render('index', {
      ranking: data
    });
  });
};
