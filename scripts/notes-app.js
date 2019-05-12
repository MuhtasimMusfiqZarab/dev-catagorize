"use strict";

//fetching from json file
getData()
  .then(products => {
    //saving  this data to local storage
    saveProducts(products);
  })
  .catch(err => {
    console.log(err);
  });

//fetching data(object) from local storage
let products = getSavedProducts();
console.log(products);

// filters
const filters = {
  searchText: ""
};

//initial rendering
renderProducts(products, filters);

//render as input changes (render by search)
document.querySelector("#search-text").addEventListener("input", e => {
  filters.searchText = e.target.value;
  renderProducts(products, filters);
});

//showing changed data to other opened tabs
window.addEventListener("storage", e => {
  //checking if the change is made to products catagory
  if (e.key === "products") {
    products = JSON.parse(e.newValue);
    renderNotes(products, filters);
  }
});
