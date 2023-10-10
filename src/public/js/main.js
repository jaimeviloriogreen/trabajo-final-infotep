const buyBtn = document.querySelector(".main__content");


buyBtn.addEventListener("click", buyProduct);


function buyProduct(e){
    if(e.target.className === "card__btn"){
        const { id } = e.target.dataset;
        console.log(id);
    }
}