//Placer le script suivant dans la section "items"
const productsList = document.getElementById("items");
//La fonction "fetch" pour récupérer les données des produits pour l'index.html et les positionner
fetch("http://localhost:3000/api/products")
    //Convertir les données en .json
    .then ((response) => response.json())
    //Récupérer les données des produits
    .then((products) => {
        //products.length permet d'afficher tous les produits en un seul exemplaire
        for (let i = 0; i < products.length; i++) {
            //Création d'un lien pour voir le produit en lui-même
            let productsLink = document.createElement("a");
            productsLink.setAttribute("href", `product.html?id=${products[i]._id}`);
            productsList.appendChild(productsLink);
            //Article contenant le produit
            let productsArticle = document.createElement ("article");
            productsLink.appendChild(productsArticle);
            //Image du produit et le texte alternatif
            let productsIMG = document.createElement("img");
            productsIMG.setAttribute("src", products[i].imageUrl);
            productsIMG.setAttribute("alt", products[i].altTxt);
            productsArticle.appendChild(productsIMG);
            //Nom du produit
            let productsName = document.createElement("h3");
            productsName.classList.add("productsName");
            productsName.textContent = products[i].name;
            productsArticle.appendChild(productsName);
            //Description du produit
            let productsDescription = document.createElement("p");
            productsDescription.classList.add("productsDescription");
            productsDescription.textContent = products[i].description;
            productsArticle.appendChild(productsDescription);
        }
    })
    //Message d'erreur
    .catch((error) => {
        console.log("Il y a un soucis concernant le chargement des articles." + error);
        let errorMessage = document.createElement("h3");
        errorMessage.textContent = "Il y a un problème technique. Veuillez réessayer ultérieurement.";
        errorMessage.style.textAlign = "center";
        productsList.appendChild(errorMessage);
    });