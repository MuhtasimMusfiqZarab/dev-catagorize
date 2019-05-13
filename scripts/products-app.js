"use strict";

//fetching from json file
getData()
  .then(products => {
    saveProducts(products);
  })
  .catch(err => {
    console.log(err);
  });

//fetching data from local storage
let products = getSavedProducts();
let parentProducts = products.filter(product => {
  return product.ParentCategoryId === 0;
});

// Search filter
const filters = {
  searchText: ""
};

//initial rendering
renderProducts(parentProducts, filters);

//render as input(search) changes
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

//reload the page to show the fetched data on the screen
// }, 1000);
if (document.referrer !== document.location.href) {
  setTimeout(function() {
    document.location.reload();
  }, 200);
}
