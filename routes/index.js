var Empresa = require('../models/empresa');

//Pagina de inicio
exports.index = function(req, res){
  res.render('index', { });
};

exports.crearEmpresa = function(req, res){
  Empresa.crearEmpresa();
  res.end();
};
