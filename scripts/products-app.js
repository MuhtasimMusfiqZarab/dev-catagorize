"use strict";

//fetching from json file
getData()
  .then(products => {
    saveProducts(products);
  })
  .catch(err => {
    console.log(err);
  });

//fetching data(object) from local storage
let products = getSavedProducts();
console.log(products);
let parentProducts = products.filter(product => {
  return product.ParentCategoryId === 0;
});

// filters
const filters = {
  searchText: ""
};

//initial rendering
renderProducts(parentProducts, filters);

//render as input changes (render by search)
document.querySelector("#search-text").addEventListener("input", e => {
  filters.searchText = e.target.value;
  if (e.target.value === "") {
    renderProducts(parentProducts, filters);
  } else {
    renderProducts(products, filters);
    highlight(filters.searchText);
  }
});

//showing changed data to other opened tabs
window.addEventListener("storage", e => {
  if (e.key === "products") {
    products = JSON.parse(e.newValue);
    renderNotes(products, filters);
  }
});
