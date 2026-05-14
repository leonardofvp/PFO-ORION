class Usuario {
	constructor (id, nombre, apellido, email, password,  rol, estado="activo") {
		this.id = id;
		this.nombre = nombre;
		this.apellido = apellido;
		this.email = email;
		this.password = password;
		this.rol = rol;
		this.estado = estado;
	}
}

module.exports = Usuario;