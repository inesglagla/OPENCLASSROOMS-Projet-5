//On donne à une variable le contenu de notre panier
let showCart = JSON.parse(localStorage.getItem("panier"));
function getLocalProduct() {
  return JSON.parse(localStorage.getItem("panier"));
}

//On fait appel à l'API pour récupérer les données
/**@param  {} id*/
 async function getDataById(id) {
  try {
    let res = await fetch(`http://localhost:3000/api/products/${id}`);
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}

//Fonction pour afficher le panier
async function displayCart() {
  const localItems = getLocalProduct();
  //Boucle qui s'applique à chaque produit
  for (let i = 0; localItems[i]; i++) {
    let data = await getDataById(localItems[i].productID);
    let elem = document.createElement('article');
    elem.classList.add("cart__item");
    elem.setAttribute("data-id", localItems[i].productID);
    elem.setAttribute("data-color", localItems[i].productColor);
    elem.innerHTML = `
    <div class="cart__item__img">
      <img src="${data.imageUrl}" alt="${data.altTxt}">
        </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${data.name}</h2>
                <p>${localItems[i].productColor}</p>
                <p>${data.price} €</p></div>
              <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${localItems[i].productQuantity}>
                </div>
              <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
        </div>
      </div>`
    document.getElementById("cart__items").appendChild(elem);
    const productPrice = data.price;
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
    }
  }
  showTotal();
  deleteProduct(); 
  changeQuantity();
}
displayCart();
//Fonction pour supprimer un produit du panier
function deleteProduct() {
  let btn_supprimer = document.querySelectorAll(".deleteItem");
  //On permet seulement la suppression d'un produit à la fois
  for (let i = 0; i < btn_supprimer.length; i++){
    //On supprime le produit à l'aide du bouton "supprimer"
      btn_supprimer[i].addEventListener("click", (event) => {
          event.preventDefault();
          //On supprime le produit en se basant sur son ID et sa couleur, on crée donc deux variables
          let idDelete = showCart[i].productID;
          let colorDelete = showCart[i].productColor;
          //On utilise un filtre pour permettre la suppression du produit
          showCart = showCart.filter (es => es.productID !== idDelete || es.productColor !== colorDelete );
          //Le produit est retiré du localStorage
          localStorage.setItem("panier", JSON.stringify(showCart));
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
          let quantityChanged = showCart[i].productQuantity;
          let quantityModifyValue = quantityModify[i].valueAsNumber;
          //On affiche le résultat du changement de quantité
          const resultFind = showCart.find (eq => eq.quantityModifyValue !== quantityChanged);
          resultFind.productQuantity = quantityModifyValue;
          showCart[i].productQuantity = resultFind.productQuantity;
          //On change la quantité présente dans le localStorage
          localStorage.setItem("panier", JSON.stringify(showCart));
          //On recharge la page
          location.reload();
      })
  }
}

//Tableau principal pour le formulaire
let client = {};
//Partie du formulaire
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
//Appliquer une variable au bouton qui sert à valider le formulaire
let buttonValidation = document.querySelector("#order");
buttonValidation.addEventListener("click", (event) => {
  let client = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value
  };
  event.preventDefault();

  //Vérification pour le prénom
  function firstNameValid() {
    const firstNameValidity = client.firstName;
    let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    if (regExAllNameTown(firstNameValidity)) {
      firstNameErrorMsg.innerHTML = '';
      return true
    } else {
      firstNameErrorMsg.innerHTML = 'Information manquante ou invalide.';
      return false;
    }
  }
  //Vérification du nom
  function lastNameValid() {
    const lastNameValidity = client.lastName;
    let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    if (regExAllNameTown(lastNameValidity)) {
      lastNameErrorMsg.innerHTML = '';
      return true
    } else {
      lastNameErrorMsg.innerHTML = 'Information manquante ou invalide.';
      return false;
    }
  }
  //Vérification de la ville
  function cityValid() {
    const cityValidity = client.city;
    let cityErrorMsg = document.getElementById("cityErrorMsg");
    if (regExAllNameTown(cityValidity)) {
      cityErrorMsg.innerHTML = '';
      return true
    } else {
      cityErrorMsg.innerHTML = 'Information manquante ou invalide.';
      return false;
    }
  }
  //Vérification de l'adresse
  function addressValid() {
    const addressValidity = client.address;
    let addressErrorMsg = document.getElementById("addressErrorMsg");
    if (regExAddress(addressValidity)) {
      addressErrorMsg.innerHTML = '';
      return true
    } else {
      addressErrorMsg.innerHTML = 'Information manquante ou invalide.';
      return false;
    }
  }
  //Vérification de l'email
  function emailValid() {
    const emailValidity = client.email;
    let emailErrorMsg = document.getElementById("emailErrorMsg");
    if (regExEmail(emailValidity)) {
      emailErrorMsg.innerHTML = '';
      return true
    } else {
      emailErrorMsg.innerHTML = 'Information manquante ou invalide.';
      return false;
    }
  }

  //On vérifie si le formulaire est validé
  if (firstNameValid() && lastNameValid() && cityValid() && addressValid() && emailValid()) {
    //On envoie les données
    //Récupération des produits dans le panier
    let idProducts = [];
    for (let i = 0; i < showCart.length; i++)
      idProducts.push(showCart[i].productID);
    //Tableau contenant les données du client
    const order = {
    contact: {
      firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      address: document.querySelector("#address").value,
      city: document.querySelector("#city").value,
      email: document.querySelector("#email").value
    },
    products: idProducts
  }
    //Envoie des données au serveur
    const options = {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
    };
    //Utilisation d'un fetch order pour renvoyer les données dans un nouveau tableau dans le localstorage
    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.clear();
        localStorage.setItem("orderId", data.orderId);
        //On renvoie le client à la page de confirmation pour qu'il récupère son numéro de commande
        document.location.href = "confirmation.html";
      })
      //Message d'erreur
      .catch((error) => {
        alert("Il y a un problème avec le fetch-order : " + error.message);
      });
  } else {
    alert("Le formulaire n'est pas valide!");
  }
})