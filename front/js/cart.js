//On donne à une variable le contenu de notre panier
let addProduct = JSON.parse(localStorage.getItem("panier"));
const positionCart = document.querySelector("#cart__items");

//On fait appel à l'API pour récupérer les données
  fetch('http://localhost:3000/api/products/')
      .then ((response) => response.json())
      .then (function (cartApi) {
        console.table(cartApi);
        for (let i = 0; i < cartApi.length; i++) {
        let productImg = cartApi[i].imageUrl;
        console.log(productImg);
        let productPrice = cartApi[i].price;
        //Fonction qui affiche le prix et la quantité total de produits dans le panier
          function showTotal () {
            //Affichage de la quantité totale
            //On crée une variable pour la quantité issue du localstorage et une variable pour la quantité totale
            let totalAffichage = document.getElementsByClassName("itemQuantity");
            let totalQuantity = 0;
            for (let i = 0; i < totalAffichage.length; ++i) {
              totalQuantity += totalAffichage[i].valueAsNumber;
            }
            //On affiche la quantité additionnée
            let quantityPlacement = document.getElementById("totalQuantity");
            quantityPlacement.innerHTML = totalQuantity;
            console.log(totalQuantity);

            //Affichage du prix total
            //Variable pour le prix total
            let totalPrice = 0;
            for (let i = 0; i < totalAffichage.length; ++i) {
              //On récupère le prix total en prenant en compte la quantité de chaque produit
              totalPrice += (totalAffichage[i].valueAsNumber * productPrice);
            }
            //On affiche le prix total récupéré
            let pricePlacement = document.getElementById("totalPrice");
            pricePlacement.innerHTML = totalPrice;
            console.log(totalPrice);
          }
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
                    <img src="${cartApi[i].imageUrl}" alt="${cartApi[i].altTxt}">
                  </div>
                  <div class="cart__item__content">
                    <div class="cart__item__content__description">
                      <h2>${cartApi[i].name}</h2>
                      <p>${addProduct[i].productColor}</p>
                      <p>${cartApi[i].price} €</p>
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
        }}}
      //Fonctions activées
      displayCart();   
      deleteProduct();    
      changeQuantity();
      showTotal();
      formulaire();
      sendOrder()
      })
      //Message d'erreur
      .catch((error) => {
        console.log("Il y a un soucis avec le panier :" + error);
      });

//Fonction pour supprimer un produit du panier
function deleteProduct() {
  let btn_supprimer = document.querySelectorAll(".deleteItem");
  //On permet seulement la suppresion d'un produit à la fois
  for (let i = 0; i < btn_supprimer.length; i++){
    //On supprime le produit à l'aide du bouton "supprimer"
      btn_supprimer[i].addEventListener("click", (event) => {
          event.preventDefault();
          //On supprime le produit en se basant sur son ID et sa couleur, on crée donc deux variables
          let idDelete = addProduct[i].productID;
          let colorDelete = addProduct[i].productColor;
          //On utilise un filtre pour permettre la suppression du produit
          addProduct = addProduct.filter (es => es.productID !== idDelete || es.productColor !== colorDelete );
          //Le produit est retiré du localStorage
          localStorage.setItem("panier", JSON.stringify(addProduct));
          //On recharge la page
          location.reload();
      })
  }
}

//Fonction pour modifier la quantité d'un produit dans le panier
function changeQuantity() {
  let quantityModify = document.querySelectorAll(".itemQuantity");
  for (let i = 0; i < quantityModify.length; i++) {
    //On permet d'utiliser l'input pour changer la quantité
      quantityModify[i].addEventListener("change", (event) => {
          event.preventDefault();
          //On crée une variable pour changer la quantité dans le localStorage mais aussi sur la page panier
          let quantityChanged = addProduct[i].productQuantity;
          let quantityModifyValue = quantityModify[i].valueAsNumber;
          //On affiche le résultat du changement de quantité
          const resultFind = addProduct.find (eq => eq.quantityModifyValue !== quantityChanged);
          resultFind.productQuantity = quantityModifyValue;
          addProduct[i].productQuantity = resultFind.productQuantity;
          //On change la quantité présente dans le localStorage
          localStorage.setItem("panier", JSON.stringify(addProduct));
          //On recharge la page
          location.reload();
      })
  }
}

//Tableau principal pour le formulaire
let client = {};
//Fonction pour le formulaire
function formulaire() {
  //Appliquer une variable au bouton qui sert à valider le formulaire
  let buttonValidation = document.getElementById("order");
  buttonValidation.addEventListener("click", (event) => {
    event.preventDefault();
    //Tableau contenant les données du client
    let client = {
      firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      address: document.querySelector("#address").value,
      city: document.querySelector("#city").value,
      email: document.querySelector("#email").value
    };
    console.log(client);
    //Utilisation de regex pour vérifier les données entrées dans les champs du formulation
    //Conditions pour le nom, le prénom et la ville
    const regExAllNameTown = (value) => {
      return /^[A-Z][A-Za-z\é\è\ê\-]+$/.test(value);
    }
    //Conditions pour l'adresse
    const regExAddress = (value) => {
      return /^[a-zA-Z0-9.,-_ ]{5,50}[ ]{0,2}$/.test(value);
    }
    //Conditions pour l'e-mail
    const regExEmail = (value) => {
      return /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(value);
    }

    //Vérification pour le prénom
    function firstNameValid() {
      const firstNameValidity = client.firstName;
      if (regExAllNameTown(firstNameValidity)) {
        console.log("Le prénom est valide!");
        return true
      } else {
        console.log("Le prénom n'est pas valide!");
        return false;
      }
    }
    //Vérification du nom
    function lastNameValid() {
      const lastNameValidity = client.lastName;
      if (regExAllNameTown(lastNameValidity)) {
        console.log("Le nom est valide!");
        return true
      } else {
        console.log("Le nom n'est pas valide!");
        return false;
      }
    }
    //Vérification de la ville
    function cityValid() {
      const cityValidity = client.city;
      if (regExAllNameTown(cityValidity)) {
        console.log("La ville est valide!");
        return true
      } else {
        console.log("La ville n'est pas valide!");
        return false;
      }
    }
    //Vérification de l'adresse
    function addressValid() {
      const addressValidity = client.address;
      if (regExAddress(addressValidity)) {
        console.log("L'adresse est valide!");
        return true
      } else {
        console.log("L'adresse n'est pas valide!");
        return false;
      }
    }
    //Vérification de l'email
    function emailValid() {
      const emailValidity = client.email;
      if (regExEmail(emailValidity)) {
        console.log("L'email est valide!");
        return true
      } else {
        console.log("L'email n'est pas valide!");
        return false;
      }
    }

    //On vérifie si le formulaire est validé
    if (firstNameValid() && lastNameValid() && cityValid() && addressValid() && emailValid) {
      console.log("C'est bon!");
    } else {
      //Si le formulaire n'est pas valide
      console.log("Il faut remplir le formulaire!");
    }
  })
}

//Envoie des données
function sendOrder() {

}
