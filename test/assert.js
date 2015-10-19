#!/usr/bin/env nodejs

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

var empresa = require('../lib/empresa');
var _ = require("underscore");
var assert = require("assert");
var should = require("should");

// Comprueba que existe el archivo de base datos
// Siempre es verdadero porque este se crea justo al importar la librería
assert.equal(empresa.existeBaseDatos(), true);

// Comprueba si una empresa llamada "prueba" es creada
// Siempre es verdadero porque si no existe la crea y si existe no hace nada
empresa.crearEmpresa({
  empresa: "prueba"
}, function(error, data) {
  empresa.existeEmpresa({
    empresa: "prueba"
  }, function(error, data) {
    assert.equal(data, true);
  });
});

// Comprueba si el ranking es generado
empresa.generarRanking(function(error, data) {
  _.each(data, function(valor) {
    valor.should.have.property("empresa");
    valor.should.have.property("numCalificaciones");
    valor.should.have.property("calificacionProm");
  });
});

console.log("Aserciones pasadas con éxito.")
