let PizzaSelecionadas = {}
let valorPizzaPopoup = 0;
let contagemPizzaPopoup = 1;
let totalPizzaPoupop = 0;
let desconto =  0.15



const loadPizzas = ()=>{


    pizzaJson.forEach((pizza , index) => {

        let section = document.querySelector("section");
        let pizzas = document.querySelector(".CardPizza").cloneNode(true);
        //PREENCHER INFORMAÇÕES

        pizzas.querySelector(".img_pizza").setAttribute("src" , pizza.img);
        pizzas.querySelector(".price_pizza").innerHTML = `R$${pizza.price.toFixed(2).replace("."  , ",")}` ;
        pizzas.querySelector(".name_pizza").innerHTML = pizza.name;
        pizzas.querySelector(".description_pizza").innerHTML = pizza.description;
        //FUNÇÕES
        pizzas.addEventListener("click" , e=>{

            PizzaSelecionadas = pizza;
            document.querySelector(".popoup-fundo").style.display = "flex";
            document.querySelector(".popoup-content img").setAttribute("src" , pizza.img)
            document.querySelector(".content h1").innerHTML = pizza.name
            document.querySelector(".content p").innerHTML = pizza.description
            document.querySelector(".valor").innerHTML = `R$${pizza.price.toFixed(2).replace("." , ",")}`
            valorPizzaPopoup = pizza.price;
            document.querySelector(".contagem").innerHTML = contagemPizzaPopoup

            
        })
        
        //FINAL FUNÇÕES
        section.append(pizzas)

        
    });


}
loadPizzas()

document.querySelector(".optionsSizes").addEventListener("click" , e=>{

    console.log()

    if(e.target.accessKey == 0){
        document.querySelectorAll(".optionsSizes button")[0].classList.add("active")
        document.querySelectorAll(".optionsSizes button")[1].classList.remove("active")
        document.querySelectorAll(".optionsSizes button")[2].classList.remove("active")
        
    }else if(e.target.accessKey == 1){

        document.querySelectorAll(".optionsSizes button")[0].classList.remove("active")
        document.querySelectorAll(".optionsSizes button")[1].classList.add("active")
        document.querySelectorAll(".optionsSizes button")[2].classList.remove("active")

    }else if(e.target.accessKey == 2){


        document.querySelectorAll(".optionsSizes button")[0].classList.remove("active")
        document.querySelectorAll(".optionsSizes button")[1].classList.remove("active")
        document.querySelectorAll(".optionsSizes button")[2].classList.add("active")
        
    }

})

//FUNÇÕES POPOUPS

document.querySelector(".add-cont").addEventListener("click" , e=>{
    contagemPizzaPopoup  = contagemPizzaPopoup + 1;
    totalPizzaPoupop = valorPizzaPopoup * contagemPizzaPopoup
    document.querySelector(".contagem").innerHTML = contagemPizzaPopoup;
    document.querySelector(".valor").innerHTML = `R$${totalPizzaPoupop.toFixed(2).replace("." , ",")}`;
})
document.querySelector(".remove-cont").addEventListener("click" , e=>{
    if(contagemPizzaPopoup <= 1){
        return
    }else{

        contagemPizzaPopoup  = contagemPizzaPopoup - 1;
        totalPizzaPoupop = valorPizzaPopoup * contagemPizzaPopoup
        document.querySelector(".contagem").innerHTML = contagemPizzaPopoup;
        document.querySelector(".valor").innerHTML = `R$${totalPizzaPoupop.toFixed(2).replace("." , ",")}`;

    }
    
})

document.querySelector(".cancelar").addEventListener("click" , e=>{
    clearPopoup()
})

document.querySelector(".add-cart").addEventListener("click" ,e=>{
    let id = PizzaSelecionadas.name.replace(/\s/g , "") + document.querySelector(".active").accessKey;
    
    Carrinho.push({
        Pizza: PizzaSelecionadas,
        Quantidade: contagemPizzaPopoup,
        Tamanho: document.querySelector(".active").accessKey,
        id: id,
        subtotal: PizzaSelecionadas.price * contagemPizzaPopoup
    })
    alert("Adicionou ao carrinho")
    clearPopoup()
    loadPizzaCarrinhos()

})

const clearPopoup = ()=>{

    document.querySelector(".popoup-fundo").style.display = "none"
    PizzaSelecionadas = {}
    valorPizzaPopoup = 0;
    contagemPizzaPopoup = 1;
    totalPizzaPoupop = 0;
    
}

const loadPizzaCarrinhos =  ()=>{

    Carrinho.forEach((pizza , index)=>{

        

       if(document.querySelectorAll(`.${pizza.id}`).length == 0){

        let Cart = document.querySelector(".lista")
        let PizzaCart  = document.querySelector(".pizza-carrinho").cloneNode(true)
        PizzaCart.querySelector("img").setAttribute("src" , pizza.Pizza.img)
        PizzaCart.querySelector("h2"). innerHTML = pizza.Pizza.name;
        PizzaCart.classList.add(pizza.id)
        PizzaCart.querySelector(".remover").addEventListener("click" , e=>{
            Carrinho.splice(index)
            CarregarValoresCarrinho()
            PizzaCart.parentNode.removeChild(PizzaCart)

        })
        PizzaCart.querySelector(".contagem-cart").innerHTML = pizza.Quantidade
        Cart.append(PizzaCart)
        valorPizzaPopoup
        
        //FUNÇÕES

        PizzaCart.querySelector(".add-cont-cart").addEventListener("click" , e=>{

            pizza.Quantidade = parseInt(pizza.Quantidade +1);
            pizza.subtotal = pizza.Quantidade * parseFloat(pizza.Pizza.price)
            PizzaCart.querySelector(".contagem-cart").innerHTML = pizza.Quantidade;
            CarregarValoresCarrinho()

            
            

            

        })
        PizzaCart.querySelector(".remove-cont-cart").addEventListener("click" , e=>{

            if(pizza.Quantidade <= 1 ) {
                return
            }  else{

                pizza.Quantidade -= 1;
                pizza.subtotal = pizza.Quantidade * parseFloat(pizza.Pizza.price)
                PizzaCart.querySelector(".contagem-cart").innerHTML = pizza.Quantidade;
                CarregarValoresCarrinho()

                


            }
            

        })
        CarregarValoresCarrinho()
             
    
    
    
     
    }else{
        return
       }

        

        

        






    })

}



function CarregarValoresCarrinho(){

    let _subtotal = 0;
    let _desconto = 0;
    let _total = 0;


    Carrinho.forEach((value)=>{

        _subtotal += value.subtotal;
       
    })

    _desconto = _subtotal * desconto;
    _total = _subtotal - _desconto;

    document.querySelector(".Sub span").innerHTML =`R$${_subtotal.toFixed(2).replace(".", ",")}` 
    document.querySelector(".Desc span").innerHTML = `R$${_desconto.toFixed(2).replace(".", ",")}` 
    document.querySelector(".Total span").innerHTML = `R$${_total.toFixed(2).replace(".", ",")}` 
    

}

setInterval(()=>{
        

  let n = document.querySelectorAll(".pizza-carrinho").length - 1 ;
  if(n <=0){
    document.querySelector(".carrinho").style.display = "none"
  }else{
    document.querySelector(".carrinho").style.display = "flex"


    
  }


},1000)