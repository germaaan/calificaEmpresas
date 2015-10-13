// Crear la base de datos 'calificaciones' y el objeto 'Empresa'
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('calificaciones');
var Empresa = {};

// Creamos la tabla de una empresa
Empresa.crearEmpresa = function(data) {
  //cambiar if not exists para provocar un error y gestionarlo
  db.run('CREATE TABLE IF NOT EXISTS ' + data.empresa + ' (id INTEGER PRIMARY KEY AUTOINCREMENT, alumno TEXT, calificacion INTEGER)',
    function(err) {
      if (err === null) {
        console.log('Empresa ' + data.empresa + ' creada correctamente.');
      }
    }
  );
}

Empresa.crearCalificacion = function(data) {
  //comprobar si la calificacion no está ya con un select para introducirla solo en dicho caso
  var stmt = db.prepare('INSERT INTO ' + data.empresa + ' VALUES (?,?,?)');
  stmt.run(null, data.alumno, data.calificacion);
  stmt.finalize();
  console.log('La calificación de prueba ha sido insertada.');
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