"use strict";

//fetching from json file
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
    return []; //unable to parse JSON data
  }
};

//saving notes==============================================
const saveProducts = products => {
  localStorage.setItem("products", JSON.stringify(products));
};

//Generate the DOM structure for a products=====================================
const generateProductDOM = product => {
  //container for elements
  const productElement = document.createElement("p");
  const textElement = document.createElement("p");
  textElement.setAttribute("id", "textHighlight");

  //setup the note title text
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
function highlight(text) {
  const textEl = text.charAt(0).toUpperCase() + text.slice(1);
  var inputText = document.getElementById("textHighlight");
  var innerHTML = inputText.innerHTML;
  var index = innerHTML.indexOf(textEl);
  if (index >= 0) {
    innerHTML =
      innerHTML.substring(0, index) +
      "<span class='highlight'>" +
      innerHTML.substring(index, index + textEl.length) +
      "</span>" +
      innerHTML.substring(index + textEl.length);
    inputText.innerHTML = innerHTML;
  }
}
