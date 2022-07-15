class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return `Tu Usuario es: ${this.nombre} ${this.apellido}.`;
    }

    addmascota(newMascota){
        this.mascotas.push(newMascota);
    }

    getMascotas(){
        return this.mascotas.length;
    }

    addBook(book, autor){
        this.libros.push( {
            "titulo": book,
            "autor": autor});
    }

    getBooks(){
        let nombresLibros = []
        this.libros.forEach(item => nombresLibros.push(item.titulo));
        return nombresLibros;
    }
    getAutor(){
        let nombresLibros = []
        this.libros.forEach(item => nombresLibros.push(item.autor));
        return nombresLibros;
    }
}

let mascotas = ["tortuga", "gato", "perro"];

let libros = [
    {
    "titulo": "El triángulo de las Bermudas",
    "autor": "Charles Berlitz"},
    {
    "titulo": "Ovnis en el Continente de Antártida",
    "autor": "Rubén Morales"},
    {
    "titulo": "Pasaporte a Magonia",
    "autor": "Jacks Vallee" }]

let user = new Usuario("Guillermo Raúl","Sapag", libros, mascotas);

console.log(user.getFullName());


user.addmascota("conejo");
user.addmascota("hamster");
user.addmascota("caracol");

console.log(`Tus mascotas son: ${user.mascotas}.`)
console.log(`Cantidad de Mascotas: ${ user.getMascotas() }.`);


user.addBook("La Isla Friendship","Octavio Ortiz")
user.addBook("Teoría de la Distorción","Antonio Caravaca")

console.log(user.getBooks());
console.log (`Mis autores favoritos son: ${user.getAutor()}.`);