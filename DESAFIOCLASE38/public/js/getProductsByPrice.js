console.log("Get Product by Price is Working!");

// const btnSearchByPrice = document.getElementById("btn-search-by-price");

// const getProductByPrice = (e) => {
//   //   e.preventDefault();
//   console.log("Toco click en el botón!");
//   const min = document.getElementById("minvalue").value;
//   const max = document.getElementById("maxvalue").value;

//   //   fetch(`/buscar/precio?min=${min}&max=${max}`, {
//   //     method: "GET",
//   //   })
//   //     .then((data) => {
//   //       console.log(data);
//   //       //   const productFinded = document.getElementById("products-finded");
//   //       //   productFinded.innerHTML = data.message;
//   //     })
//   //     .catch((e) => console.log(e));

//   fetch(`/buscar/precio?min=${min}&max=${max}`)
//     .then((data) => {
//       const results = data.json();
//       console.log(results);
//     })
//     .catch((e) => console.log(e));
// };

// btnSearchByPrice.addEventListener("click", getProductByPrice);
