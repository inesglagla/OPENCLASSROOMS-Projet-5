//Sert à voir ce qu'il y a dans l'api (à supprimer quand le code sera terminé!!!)
fetch(`http://localhost:3000/api/products`)
    .then ((response) => response.json())
    .then((produits) => {
        console.table(produits);
    })

//Placer le produit dans la section "item"
const produitID = document.getElementsByClassName("item");

//La fonction "fetch" pour récupérer les données des produits pour l'index.html et les positionner
fetch(`http://localhost:3000/api/products`)
    .then ((response) => response.json())
    .then((produits) => {
        for (let i = 0; i < produits.length; i++) {
            //Nom du produit
            let produitsName = document.getElementsByName("h1");
            produitsName.textContent = produits[i].name;
            console.log(produitsName);
        }
    })

    //Message d'erreur
    .catch((error) => {
        console.log("Il y a un soucis concernant le chargement de l'article." + error);
        let errorMessage = document.createElement("h3");
        errorMessage.textContent = "Il y a un problème avec cet article. Veuillez réessayer ultérieurement.";
        errorMessage.style.textAlign = "center";
        produitsID.appendChild(errorMessage);
    });

// Img+Alt dans <div class> "item__img"
//Nom dans <h1 id> "title"
//Prix dans <span id> "price"
//Description dans <p id> "description"
//Options de couleurs dans <select name> "color-select" et <option value> "" (les options value sont vert et blanc)