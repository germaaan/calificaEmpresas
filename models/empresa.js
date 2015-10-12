// Crear la base de datos 'calificaciones' y el objeto 'Empresa'
var sqlite3 = require('sqlite3').verbose(),
db = new sqlite3.Database('calificaciones'),
Empresa = {};

// Creamos la tabla de una empresa
Empresa.crearEmpresa = function(){
	db.run('CREATE TABLE IF NOT EXISTS osl (id INTEGER PRIMARY KEY AUTOINCREMENT, alumno TEXT, calificacion INTEGER)');
	console.log('La tabla de la empresa de prueba ha sido creada.');
}

Empresa.crearCalificacion = function(data){
	var stmt = db.prepare('INSERT INTO osl VALUES (?,?,?)');
	stmt.run(null,data.alumno,data.calificacion);
	stmt.finalize();
	console.log('La calificación de prueba ha sido insertada.');
}

Empresa.listarTodo = function(cb){
	db.all('SELECT * FROM osl', function(err, rows){
		if(err){
			throw err;
		}else{
			cb(null, rows);
		}
	});
}

// Exportar el modelo para poder utilizar sus funcionalidades
module.exports = Empresa;
