const productos = [
    { producto: "dove aerosol", tipo: "aerosol", precio: 200 },
    { producto: "dove barra", tipo: "barra", precio: 250 },
    { producto: "aktiol", tipo: "alcohol", precio: 120 },
    { producto: "duracell", tipo: "d", precio: 185 },
    { producto: "gillette match 3", tipo: "match 3", precio: 235 },
    { producto: "gilette venus", tipo: "venus", precio: 100 },

];

const carrito = [];

let miPedido;

while (miPedido != "") {

    miPedido = prompt("ingrese un producto o de lo contrario haga click en Ok");
    const seleccionProducto = productos.find(productos => productos.producto === miPedido);
    console.log("Producto seleccionado: " + seleccionProducto)

    if (seleccionProducto != "") {
        console.log("Producto encontrado")
        carrito.push(seleccionProducto);
        console.log("Producto agregado")
    }

    if (miPedido === "") {
        console.log("Saliendo. Imprimiendo carrito: " + carrito)
        const totalPrice = carrito.reduce((total, item) => {
            return total = total + item.precio
        },0)
        console.log(totalPrice)
    }
}