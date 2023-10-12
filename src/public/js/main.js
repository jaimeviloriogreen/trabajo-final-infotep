const buyBtn = document.querySelector(".main__content");
const carrito = document.querySelector(".main__cart-items-text");
const cartSection = document.querySelector(".carts");
const totalPagarElement = document.querySelector(".pays__total");

cantidadCarrito();
totalAPagar();

if(buyBtn)buyBtn.addEventListener("click", buyProduct);
if(cartSection) cartSection.addEventListener("click", actualizarInput);


async function buyProduct(e){
    if(e.target.className === "card__btn"){
        const id = e.target.dataset;
        const result = await sendDataProduct(id);
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

async function actualizarInput(e){
    
    if(e.target.className == "carts__mas"){
        let { id } = e.target.parentElement.parentElement.parentElement.dataset;
        const input = e.target.nextElementSibling;
        
        input.value = parseInt(input.value) + 1

        actualizarInputCantidad(input.value, id);
    
    }
    if(e.target.className == "carts__menos"){
        let { id } = e.target.parentElement.parentElement.parentElement.dataset;
        const input = e.target.previousElementSibling;
        
        if(input.value <= 1) return;

        input.value = parseInt(input.value) - 1;
        actualizarInputCantidad(input.value, id);
    }
}

async function actualizarInputCantidad(qty, id){
     const request = await fetch("/actualizar-carrito", {
        method:"POST", 
        headers:{ 'Content-Type': 'application/json;charset=utf-8' },
        body:JSON.stringify({qty, id})
    });
    const { affectedRows } = await request.json();
    
    if(affectedRows >= 1) cantidadCarrito(); totalAPagar();
    // return response
};


async function totalAPagar(){
      const request = await fetch("/total-pagar", {
        method:"POST", 
        headers:{ 'Content-Type': 'application/json;charset=utf-8' }
    });

    const { totalPagar } = await request.json();
    
    if(totalPagarElement){
        if(totalPagar){
            totalPagarElement.textContent =  `RD$ ${ totalPagar }`;
        }
    };
}



