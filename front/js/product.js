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
        productCouleurPlacement.appendChild(productCouleur);
        }
    })
    //Message d'erreur
    .catch((error) => {
        console.log("Il y a un soucis concernant le chargement de l'article." + error);
    });