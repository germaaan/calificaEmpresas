// Dependencias
var sqlite3 = require('sqlite3').verbose();

// Crear la base de datos 'calificaciones' y el objeto 'Empresa' sobre el que acceder a las funcionalidades
var db = new sqlite3.Database('calificaciones.db');
var Empresa = {};

Empresa.existeEmpresa = function(data, cb) {
  var stmt = db.prepare('SELECT name FROM sqlite_master WHERE type = "table" AND name = ?');
  stmt.bind(data.empresa);
  stmt.get(function(error, row) {
    if (error) {
      throw err;
    } else {
      if (row) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    }
  });
}

Empresa.existeAlumno = function(data, cb) {
  var stmt = db.prepare('SELECT alumno FROM ' + data.empresa + ' WHERE alumno = ?');
  stmt.bind(data.alumno);
  stmt.get(function(error, row) {
    if (error) {
      throw err;
    } else {
      if (row) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    }
  });
}

Empresa.crearEmpresa = function(data, cb) {
  Empresa.existeEmpresa(data, function(error, data2) {
    if (data2 == false) {
      var stmt = db.prepare('CREATE TABLE ' + data.empresa + ' (id INTEGER PRIMARY KEY AUTOINCREMENT, alumno TEXT, ' +
        'calificacion INTEGER)');
      stmt.get(function(error, row) {
        if (error) {
          throw err;
        } else {
          var msg = 'Empresa ' + data.empresa + ' creada correctamente.';
          console.log(msg);
          cb(null, msg);
        }
      });
    } else {
      var msg = 'Ya existe la empresa ' + data.empresa + '.';
      console.log(msg);
      cb(null, msg);
    }
  });
}

Empresa.crearCalificacion = function(data, cb) {
  Empresa.existeEmpresa(data, function(error, data2) {
    if (data2 == true) {
      Empresa.existeAlumno(data, function(error, data3) {
        if (data3 == true) {
          var msg = 'Ya existe una calificación para la empresa ' + data.empresa + ' del alumno ' + data.alumno + '.';
          console.log(msg);
          cb(null, msg);
        } else {
          var stmt = db.prepare('INSERT INTO ' + data.empresa + ' VALUES (?,?,?)');
          stmt.bind(null, data.alumno, data.calificacion);
          stmt.get(function(error, row) {
            if (error) {
              throw err;
            } else {
              var msg = 'Calificación para la empresa ' + data.empresa + ' añadida.';
              console.log(msg);
              cb(null, msg);
            }
          });
        }
      });
    } else {
      var msg = 'No se puede calificar una empresa que no ha sido creada.' + data.empresa + '.';
      console.log(msg);
      cb(null, msg);
    }
  });
}

Empresa.obtenerTablas = function() {
  db.all('SELECT name FROM sqlite_master WHERE type = "table" AND name != "sqlite_sequence"', function(err, rows) {
    if (err) {
      throw err;
    } else {
      console.log(rows);
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