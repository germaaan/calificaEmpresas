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
