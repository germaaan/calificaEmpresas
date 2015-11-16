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


// Dependencias
var _ = require("underscore");
var assert = require("assert");
var request = require("supertest");
var should = require("should");

// Módulos de la aplicación
var app = require('../app.js');
var empresa = require('../lib/empresa');

// Método para parsear archivos JSON a objetos JS
var cargar = function(archivo) {
  var config = null;

  try {
    config = JSON.parse(fs.readFileSync(archivo));
  } catch (e) {
    console.log("Error: no existe el archivo " + archivo);
  }

  return config;
};

var enlaces = cargar(__dirname + "/../test/enlaces.json");

describe('Tests básicos', function() {
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

  it('Generación de ranking', function(done) {
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

// Prueba de acceso a la página
describe('Prueba de acceso', function() {
  _.each(enlaces, function(valor) {
    it(valor.nombre, function(done) {
      request(app)
        .get(valor.ruta)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          done();
        });
    });
  });
  it("Página de error", function(done) {
    request(app)
      .get("/foo")
      .expect(404)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        done();
      });
  });
});
