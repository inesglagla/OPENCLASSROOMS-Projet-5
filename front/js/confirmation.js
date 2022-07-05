//Fonction pour afficher le numéro de commande
function confirmation() {
    const orderId = document.getElementById('orderId');
    orderId.innerHTML = localStorage.getItem('orderId');
    //On ne conserve pas le numéro de commande
    localStorage.clear();
}
confirmation();