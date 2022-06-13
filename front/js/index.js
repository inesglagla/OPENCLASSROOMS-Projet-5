//Placer le script suivant dans la section "items"
const produitsList = document.getElementById("items");
//La fonction "fetch" pour récupérer les données des produits pour l'index.html et les positionner
fetch("http://localhost:3000/api/products")
    .then ((response) => response.json())
    .then((produits) => {
        for (let i = 0; i < produits.length; i++) {
            //Création d'un lien pour voir le produit en lui-même
            let produitsLink = document.createElement("a");
            produitsLink.setAttribute("href", `product.html?id=${produits[i]._id}`);
            produitsList.appendChild(produitsLink);
            //Article conteneur pour le produit
            let produitsArticle = document.createElement ("article");
            produitsLink.appendChild(produitsArticle);
            //Image du produit et le texte alternatif
            let produitsIMG = document.createElement("img");
            produitsIMG.setAttribute("src", produits[i].imageURL);
            produitsIMG.setAttribute("alt", produits[i].altTxt);
            produitsArticle.appendChild(produitsIMG);
            //Nom du produit
            let produitsName = document.createElement("h3");
            produitsName.classList.add("produitsName");
            produitsName.textContent = produits[i].name;
            produitsArticle.appendChild(produitsName);
            //Description du produit
            let produitsDescription = document.createElement("p");
            produitsDescription.classList.add("produitsDescription");
            produitsDescription.textContent = produits[i].description;
            produitsArticle.appendChild(produitsDescription);
        }
    })
    //Message d'erreur
    .catch((error) => {
        console.log("Il y a un soucis concernant le chargement des articles." + error);
        let errorMessage = document.createElement("h3");
        errorMessage.textContent = "Il y a un problème technique. Veuillez réessayer ultérieurement.";
        errorMessage.style.textAlign = "center";
        produitsList.appendChild(errorMessage);
    });
