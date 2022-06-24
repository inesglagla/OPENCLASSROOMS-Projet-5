//Placer le produit dans la section "item"
const productPlacement = document.getElementsByClassName("item");

//Rapporter l'URL avec URLSearchParams
let params = new URLSearchParams(window.location.search);
const id = params.get('id');
//La fonction "fetch" en ajoutant un +id pour que les données renvoyées soient celles de l'ID associé
fetch('http://localhost:3000/api/products/'+id)
    //Convertir les données en .json
    .then ((response) => response.json())
    //Récupérer les données des produits
    .then(function (products) {
        //Image avec texte alternatif et sa place dans le DOM
        let productImgPlacement = document.getElementsByClassName("item__img")[0];
        let productImg = document.createElement('img');
        productImg.setAttribute("src", products.imageUrl);
        productImg.setAttribute("alt", products.altTxt);
        productImgPlacement.appendChild(productImg);
        //Nom du produit et sa place dans le DOM
        let productNom = document.getElementById('title');
        productNom.innerHTML = products.name;
        //Prix du produit et sa place dans le DOM
        let productPrix = document.getElementById('price');
        productPrix.innerHTML = products.price;
        //Description du produit et sa place dans le DOM
        let productDescription = document.getElementById('description');
        productDescription.innerHTML = products.description;
        //Choix de la couleur et sa place dans le DOM
        let productCouleurPlacement = document.getElementById('colors');
        let colorsList = products.colors;
        for (let i = 0; i < colorsList.length; i++) {
        let productCouleur = document.createElement('option');
        productCouleur.innerHTML = products.colors[i];
            //Sauvegarder le choix de la couleur dans une variable
            for (let i = 0; i < `${products.colors[i]}`.length; i++) {
                let buttonColor = productCouleurPlacement;
                buttonColor.addEventListener('input', (ec) => {
                    colorItem = ec.target.value;
                    console.log(colorItem);
                })
            }
        //Fermeture de la partie couleur
        productCouleurPlacement.appendChild(productCouleur);
        }
        //Choisir la quantité du produit
        let productQuantité = document.getElementsByName('itemQuantity');

        for (let i = 0; i < productQuantité.length; i++) {
            let buttonQuantity = productQuantité[i];
            buttonQuantity.addEventListener('input', (eq) => {
                productQuantityAll = eq.target.value;
                console.log(productQuantityAll);
            })
        }
    //Ajouter le produit au panier
        //Créer les variables principales avant l'interaction
        let productColor;
        let productQuantity;
        //Créer les variables qui contiendront les choix
        let colorItem;
        let productQuantityAll;
        //Interagir avec le bouton pour ajouter au panier
        const addCart = document.querySelector("#addToCart")
        addCart.addEventListener('click', e => {
            //Configuration du produit pour le stocker
            let productData = {
            productID : products._id,
            productColor : colorItem,
            productQuantity : productQuantityAll
            }
            //Ajout dans du produit dans le localStorage, avec un array servant de panier
            let addProductCart = JSON.parse(localStorage.getItem("Panier"));
            //Condition si une couleur et une quantité n'ont pas été choisies
            if (productQuantityAll == undefined || productQuantityAll < 1 || productQuantityAll > 100 || colorItem == undefined || productQuantityAll && colorItem == undefined) {
                alert('Il faut choisir une quantité entre 1 et 100! Il faut aussi choisir une couleur!');
            //Si le panier n'existe pas, on le crée avec le premier produit
            } else if (addProductCart == null) {
                    addProductCart = [];
                    addProductCart.push(productData);
                    localStorage.setItem("Panier", JSON.stringify(addProductCart));
                    console.log(addProductCart);
            //Si le panier existe, on suit la condition suivante
            } else {
                    //Variable pour montrer que le panier existe et contient un produit au minimum
                    productsAdded = JSON.parse(localStorage.getItem("Panier"));
                    if (productsAdded) {
                        for (let choice of productsAdded) {
                            //On vérifie si l'ID du produit et sa couleur existent déjà dans le panier
                            if (choice.productID == products._id && choice.productColor == colorItem) {
                                //Si ils sont pareils, on ajoute uniquement la quantité au panier
                                let addQuantity = parseInt(choice.productQuantity) + parseInt(productQuantityAll);
                                choice.productQuantity = JSON.stringify(addQuantity);
                                console.log("On a ajouté la nouvelle quantité");
                                return (localStorage.Panier = JSON.stringify(productsAdded));
                        } //Si la couleur et l'ID sont différents, on ajoute le produit au panier
                        else (addProductCart == true); {
                        addProductCart.push(productData);
                        localStorage.setItem("Panier", JSON.stringify(addProductCart));
                        console.log("On a ajouté le nouveau produit")
                        }
                    }
                }
            }
        })
    })
    //Message d'erreur
    .catch((error) => {
        console.log("Il y a un soucis concernant le chargement de l'article :" + error);
    });