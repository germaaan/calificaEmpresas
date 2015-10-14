var empresa = require('../models/empresa');

//Pagina de inicio
exports.index = function(req, res) {
  res.render('index', {});
};

exports.crearEmpresa = function(req, res) {
  var strEmp = req.params.empresa;
  strEmp = strEmp.replace(':', '');
  empresa.crearEmpresa({
    empresa: strEmp.toUpperCase()
  });
  res.render('index', {
    mensaje: 'Empresa ' + strEmp + ' creada correctamente.'
  });
};

exports.crearCalificacion = function(req, res) {
  var strEmp = req.params.empresa;
  strEmp = strEmp.replace(':', '');
  var strAlu = req.params.alumno;
  strAlu = strAlu.replace(':', '');
  var strCal = req.params.calificacion;
  strCal = strCal.replace(':', '');

  empresa.crearCalificacion({
    empresa: strEmp.toUpperCase(),
    alumno: strAlu.toUpperCase(),
    calificacion: strCal.toUpperCase()
  }, function(error, data) {
    res.render('index', {
      mensaje: data
    });
  });
};

exports.listarTodo = function(req, res) {
  empresa.listarTodo(function(error, data) {
    res.render('index', {
      datos: data
    });
  });
};