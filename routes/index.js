var empresa = require('../models/empresa');

//Pagina de inicio
exports.index = function(req, res) {
  res.render('index', {});
};

exports.crearEmpresa = function(req, res) {
  var str = req.params.empresa;
  str = str.replace(':', '');
  empresa.crearEmpresa(str.toUpperCase());
  //comprobar si se ha creado
  res.render('index', {
    mensaje: 'La empresa ' + str + ' ha sido creada.'
  });
};

exports.crearCalificacion = function(req, res) {
  empresa.crearCalificacion({
    alumno: 'German',
    calificacion: 10
  });
  res.render('index', {
    mensaje: 'La calificación de prueba ha sido insertada.'
  });
};

exports.listarTodo = function(req, res) {
  empresa.listarTodo(function(error, data) {
    res.render('index', {
      datos: data
    });
  });
};
