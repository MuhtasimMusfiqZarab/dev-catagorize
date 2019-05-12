"use strict";

//fetching from json file
//fetch inside a function with async/await==> async always returns a promise
const getData = async () => {
  const response = await fetch("/json/json.json", {});
  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error("Unable to fetch the puzzle");
  }
};

//read existing notes from local storage Products===================
const getSavedProducts = () => {
  const productsJSON = localStorage.getItem("products");
  try {
    return productsJSON ? JSON.parse(productsJSON) : [];
  } catch (error) {
    return []; //if unable to parse JSON data
  }
};

//saving notes==============================================
const saveProducts = products => {
  localStorage.setItem("products", JSON.stringify(products));
};

//Generate the DOM structure for a products==========================2
const generateProductDOM = product => {
  //this is the container element for p and button
  const productElement = document.createElement("a");
  const textElement = document.createElement("p");
  // const statusEl = document.createElement("p");

  //setup the note title text
  if (product.Name.length > 0) {
    textElement.textContent = product.Name;
  } else {
    textElement.textContent = "Unnamed Product ";
  }
  textElement.classList.add("list-item__title");

  productElement.appendChild(textElement);

  //setup the link
  productElement.setAttribute("href", `/edit.html#${product.Id}`);
  productElement.classList.add("list-item");

  return productElement;
};

//rendering application products=======================================2--done
const renderProducts = (products, filters) => {
  const productsEl = document.querySelector("#notes");
  const filteredProducts = products.filter(product =>
    product.Name.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  //clearing previous rendered notes
  productsEl.innerHTML = "";

  //if we are rendering any notes
  if (filteredProducts.length > 0) {
    //add filteded notes to DOM
    filteredProducts.forEach(product => {
      const productElement = generateProductDOM(product);
      productsEl.appendChild(productElement);
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = " No products found";
    //adding styles to this paragraph
    emptyMessage.classList.add("empty-message");
    productsEl.appendChild(emptyMessage);
  }
};
