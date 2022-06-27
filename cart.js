//On donne à une variable le contenu de notre panier
let addProduct = JSON.parse(localStorage.getItem("panier"));
console.table(addProduct);
const positionCart = document.querySelector("#cart__items");

//On fait appel à l'API pour récupérer les données
function apiCart () {
  fetch(`http://localhost:3000/api/products/`)
      .then ((response) => response.json())
      .then (function (cart) {
        console.table(cart);
      })
      //Message d'erreur
      .catch((error) => {
        console.log("Il y a un soucis avec le panier :" + error);
      });
}
apiCart ();

//Fonction unique qui s'applique à chaque produit
function displayCart() {
//Si le panier est vide, on affiche un message
if (addProduct === null || addProduct == 0) {
    const emptyCart = `<h2>Votre panier est vide. Veuillez le remplir.</h2>`;
    positionCart.innerHTML = emptyCart;
} else {
//Si un produit se trouve dans le localstorage, on affiche le panier
//Boucle qui doit s'appliquer à chaque produit
for (i = 0; i < addProduct.length; i++) {
  //Structure propre à chaque produit
  positionCart.innerHTML = addProduct.map(() => `
  <article class="cart__item" data-id="${addProduct[i].productID}" data-color="${addProduct.productColor}">
          <div class="cart__item__img">
            <img src="${addProduct[i].imageUrl}" alt="${addProduct[i].altTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${addProduct[i].name}</h2>
              <p>${addProduct[i].productColor}</p>
              <p>${addProduct[i].price}</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${addProduct[i].productQuantity}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
        </article>
  `)
}
}}

//On fait appel à la fonction du panier
displayCart();

//Fonction pour supprimer un produit du panier
function deleteProduct() {
  let btn_supprimer = document.querySelectorAll(".deleteItem");

  //On permet seulement la suppresion d'un produit à la fois
  for (let i = 0; i < btn_supprimer.length; i++){
    //On supprime le produit à l'aide du bouton "supprimer"
      btn_supprimer[i].addEventListener("click" , (event) => {
          event.preventDefault();
          //On supprime le produit en se basant sur son ID et sa couleur, on crée donc deux variables
          let idDelete = addProduct[i].productID;
          let colorDelete = addProduct[i].productColor;
          //On utilise un filtre pour permettre la suppression du produit
          addProduct = addProduct.filter( el => el.productID !== idDelete || el.productColor !== colorDelete );
          //Le produit est retiré du localStorage
          localStorage.setItem("panier", JSON.stringify(addProduct));
      })
  }
}
deleteProduct();


//fetch(`http://localhost:3000/api/products/${productId}`)

/* CONSERVER
//On donne à une variable le contenu de notre panier
let addProduct = JSON.parse(localStorage.getItem("Panier"));

//Boucle pour chaque produit et ses propres caractéristiques
for (cart of addProduct) {
  for(let i = 0; i < addProduct.length; i++) {
//On appelle de nouveau l'API pour obtenir toutes les données sur les produits
fetch(`http://localhost:3000/api/products/`) // <-------------------------------------------------- Le problème vient de l'api, voir avec le "for"
    .then ((response) => response.json())
    .then (function (product) {
      console.table(product);
      //Fonction qui affiche un produit quand il y en a un dans le panier
      const cartDisplay = async () => {
        if(addProduct) {
            await addProduct;
            //Structure propre à chaque produit
            cart__items.innerHTML = addProduct.map((cart) => `
            <article class="cart__item" data-id="${cart._id}" data-color="{product-color}">
                    <div class="cart__item__img">
                      <img src="${cart.imageUrl}" alt="${cart.altTxt}">
                    </div>
                    <div class="cart__item__content">
                      <div class="cart__item__content__description">
                        <h2>${cart.name}</h2>
                        <p>${cart.colors}</p>
                        <p>${cart.price}</p>
                      </div>
                      <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                          <p>Qté : ${cart.quantity}</p>
                          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                        </div>
                        <div class="cart__item__content__settings__delete">
                          <p class="deleteItem">Supprimer</p>
                        </div>
                      </div>
                    </div>
                  </article>
            `)
            console.table(addProduct[product.color]);
        }
      }
      cartDisplay(product);
    })
    //Message d'erreur
    .catch((error) => {
        console.log("Il y a un soucis concernant le chargement du panier :" + error);
      })
    }
  }
*/