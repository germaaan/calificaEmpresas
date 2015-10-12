var Empresa = require('../models/empresa');

//Pagina de inicio
exports.index = function(req, res){
  res.render('index', { });
};

exports.crearEmpresa = function(req, res){
  Empresa.crearEmpresa();
  res.render('index', {mensaje:'La tabla de la empresa de prueba ha sido creada.'});
};

exports.crearCalificacion = function(req, res){
  Empresa.crearCalificacion({alumno:'German',calificacion:10});
  res.render('index', {mensaje:'La calificación de prueba ha sido insertada.'});
};

exports.listarTodo = function(req, res){
  Empresa.listarTodo(function(error,data){
    res.render('index',{
      datos: data
    });
  });
};
