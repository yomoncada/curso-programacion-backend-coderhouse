class Usuario {
    constructor({nombre, apellido, libros, mascotas}) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(nombre) {
        this.mascotas.push(nombre);
    }

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(nombre, autor) {
        this.libros.push({nombre: nombre, autor: autor});
    }

    getBookNames() {
        let bookNames = new Array;

        this.libros.map(function(libro) {
            bookNames.push(libro.nombre)    
        });

        return bookNames;
    }
}

let usuario = new Usuario({nombre: 'Yonathan', apellido: 'Moncada', libros: [], mascotas: []});

console.log(usuario.getFullName());

usuario.addMascota('Chispas');
usuario.addMascota('Copo de Nieve');
usuario.addMascota('Firulais');

console.log(usuario.countMascotas());

usuario.addBook('Harry Potter', 'J.K. Rowling');
usuario.addBook('El Código da Vinci', 'Dan Brown');

console.log(usuario.getBookNames());
