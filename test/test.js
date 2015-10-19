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

'use strict';

var empresa = require('../lib/empresa');
var _ = require("underscore");
var assert = require("assert");
var should = require("should");

describe('Tests', function() {
  it('Existe base de datos', function(done) {
    assert.equal(empresa.existeBaseDatos(), true);
    done();
  });

  it('Creación de empresas', function(done) {
    empresa.crearEmpresa({
      empresa: "prueba"
    }, function(error, data) {
      empresa.existeEmpresa({
        empresa: "prueba"
      }, function(error, data) {
        assert.equal(data, true);
      });
    });
    done();
  });

  it('Generación de ranking:', function(done) {
    empresa.generarRanking(function(error, data) {
      _.each(data, function(valor) {
        valor.should.have.property("empresa");
        valor.should.have.property("numCalificaciones");
        valor.should.have.property("calificacionProm");
      });
    });
    done();
  });
});
