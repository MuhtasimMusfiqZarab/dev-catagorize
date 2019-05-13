"use strict";

//fetching from json file
const getData = async () => {
  const response = await fetch("/json/json.json", {});
  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error("Unable to fetch data");
  }
};

//read existing products from local storage ===================================
const getSavedProducts = () => {
  const productsJSON = localStorage.getItem("products");
  try {
    return productsJSON ? JSON.parse(productsJSON) : [];
  } catch (error) {
    return []; //unable to parse JSON data
  }
};

//saving Products==============================================
const saveProducts = products => {
  localStorage.setItem("products", JSON.stringify(products));
};

//Generate the DOM structure for a product=====================================
const generateProductDOM = product => {
  //container  with the textElement
  const productElement = document.createElement("p");
  const textElement = document.createElement("p");

  //Setting Up class attributes
  const classAttribute = document.createAttribute("class");
  classAttribute.value = "textHighlight";
  textElement.setAttributeNode(classAttribute);

  //setup the Product Title text
  if (product.Name.length > 0) {
    textElement.textContent = product.Name;
  } else {
    textElement.textContent = "Unnamed Product ";
  }
  textElement.classList.add("list-item__title");
  productElement.appendChild(textElement);
  productElement.classList.add("list-item");

  return productElement;
};

//rendering  products=======================================
const renderProducts = (products, filters) => {
  const productsEl = document.querySelector("#notes");
  const filteredProducts = products.filter(product =>
    product.Name.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  //clearing previous rendered Products
  productsEl.innerHTML = "";

  //Checking for render
  if (filteredProducts.length > 0) {
    //add products to DOM
    filteredProducts.forEach(product => {
      const productElement = generateProductDOM(product);
      productsEl.appendChild(productElement);
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = " No products found";
    emptyMessage.classList.add("empty-message");
    productsEl.appendChild(emptyMessage);
  }
};

//text highlight as per search
const highlight = text => {
  const textEl = text.charAt(0).toUpperCase() + text.slice(1);
  let inputText = document.querySelector(".textHighlight");
  let innerHTML = inputText.innerHTML;
  const index = innerHTML.indexOf(textEl);
  if (index >= 0) {
    innerHTML =
      innerHTML.substring(0, index) +
      "<span class='highlight'>" +
      innerHTML.substring(index, index + textEl.length) +
      "</span>" +
      innerHTML.substring(index + textEl.length);
    inputText.innerHTML = innerHTML;
  }
};
