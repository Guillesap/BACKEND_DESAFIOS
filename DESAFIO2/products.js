const Contenedor = require('./desafio.js')

const run = async function () {
    let contenedor = new Contenedor('productos.txt')
    contenedor.save({
        title: "Notebook",
        price: 200000,
        thumbnail: "https://img2.gratispng.com/20171220/yul/laptop-notebook-png-image-5a3a0f2d781715.19726026151375441349199198.jpg"
    })

    contenedor.save({
        title: "Celular",
        price: 100000,
        thumbnail: "https://imagenspng.com/wp-content/uploads/fotos-de-celular-png-%E2%80%AA2452-x-1511%E2%80%ACpx-972-KB-2048x1262.png"
    })

    contenedor.save({
        title: "Tablet",
        price: 50000,
        thumbnail: "https://static8.depositphotos.com/1000128/1018/i/600/depositphotos_10187709-stock-photo-set-of-tablet-computers.jpg"
    })
    console.log(contenedor.getById(1));
    console.log(contenedor.getById(5));
    console.log(contenedor.getAll());
    console.log(contenedor.deleteById(1));
    console.log(contenedor.deleteById(6));
    console.log(contenedor.getAll());
    contenedor.deleteAll();
    console.log(contenedor.getAll());
};

run();