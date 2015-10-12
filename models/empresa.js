// Crear la base de datos 'calificaciones' y el objeto 'Empresa'
var sqlite3 = require('sqlite3').verbose(),
db = new sqlite3.Database('calificaciones'),
Empresa = {};

// Creamos la tabla de una empresa
Empresa.crearEmpresa = function(){
	db.run("DROP TABLE IF EXISTS prueba");
	db.run("CREATE TABLE IF NOT EXISTS prueba (id INTEGER PRIMARY KEY AUTOINCREMENT, alumno TEXT, calificacion INTEGER)");
	console.log("La tabla usuarios ha sido correctamente creada");
}

// Exportar el modelo para poder utilizar sus funcionalidades
module.exports = Empresa;
