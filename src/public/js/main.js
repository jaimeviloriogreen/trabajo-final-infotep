const buyBtn = document.querySelector(".main__content");
const carrito = document.querySelector(".main__cart-items-text");

cantidadCarrito();
buyBtn.addEventListener("click", buyProduct);


async function buyProduct(e){
    if(e.target.className === "card__btn"){
        const id = e.target.dataset;
        const result = await sendDataProduct(id);
        console.log(result);
        cantidadCarrito();
    }
}

async function sendDataProduct(id){
    const request = await fetch("/agregar-carrito", {
        method:"POST", 
        headers:{ 'Content-Type': 'application/json;charset=utf-8' },
        body:JSON.stringify(id)
    });

    const response = await request.json();
    return response
}

async function cantidadCarrito(){
      const request = await fetch("/cantidad-carrito", {
        method:"POST", 
        headers:{ 'Content-Type': 'application/json;charset=utf-8' }
    });

    const { cantidad_productos } = await request.json();

    carrito.textContent = cantidad_productos || 0;
}

