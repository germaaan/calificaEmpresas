// Crear la base de datos 'calificaciones' y el objeto 'Empresa'
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('calificaciones');
var Empresa = {};

// Creamos la tabla de una empresa
Empresa.crearEmpresa = function(data) {
  //cambiar if not exists para provocar un error y gestionarlo
  db.run('CREATE TABLE IF NOT EXISTS ' + data.empresa + ' (id INTEGER PRIMARY KEY AUTOINCREMENT, ALUMNO TEXT, CALIFICACION INTEGER)',
    function(err) {
      if (err === null) {
        console.log('Empresa ' + data.empresa + ' creada correctamente.');
      }
    }
  );
}

Empresa.crearCalificacion = function(data, cb) {
  //comprobar que existe la empresa
  var stmt = db.prepare('SELECT ALUMNO FROM ' + data.empresa + ' WHERE ALUMNO = ?');
  stmt.bind(data.alumno);
  stmt.get(function(error, row) {
    if (error) {
      throw err;
    } else {
      if (row) {
        var msg = 'Ya existe una calificación para la empresa ' + data.empresa + ' del alumno ' + data.alumno + '.'
        console.log(msg);
        cb(null, msg);
      } else {
        stmt = db.prepare('INSERT INTO ' + data.empresa + ' VALUES (?,?,?)');
        stmt.run(null, data.alumno, data.calificacion);
        stmt.finalize();
        var msg = 'Calificación para la empresa ' + data.empresa + ' añadida.'
        console.log(msg);
        cb(null, msg);
      }
    }
  });
}

Empresa.listarTodo = function(cb) {
  db.all("SELECT * FROM OSL", function(err, rows) {
    if (err) {
      throw err;
    } else {
      cb(null, rows);
    }
  });
}

// Exportar el modelo para poder utilizar sus funcionalidades
module.exports = Empresa;
