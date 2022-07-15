console.log("Chcekout Cart Working!");

function buyCart() {
  alert("¡Pedido realizado!");
  fetch("/api/cart/create", {
    method: "POST",
  })
    .then((data) => {
      console.log(data);
      location.replace("/purchase-completed");
    })
    .catch((e) => console.log(e));
}
