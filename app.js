const form = document.querySelector(".inputForm");
const products = document.querySelector(".products");
const productNameInput = document.querySelector(".productName");
const ProductPriceInput = document.querySelector(".productPrice");
const totalPrice = document.querySelector("#totalPrice");
const productCount = document.querySelector("#productCount");

let total = 0;
let count = 0;

// Əlavə etdiyimiz  məhsulları localStorage-dan yükləyirik
loadProductsFromLocalStorage();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getProduct();
});

function getProduct() {
  count++;
  const productPrice = parseInt(ProductPriceInput.value);
  total += productPrice;

  const productName = productNameInput.value;

  // Yeni məhsul obyekti
  const productObj = {
    name: productName,
    price: productPrice,
  };

  // Məhsulu localStorage-a əlavə edirik
  saveProductToLocalStorage(productObj);

  // UI-a məhsulu əlavə edirik
  addProductToUI(productObj);

  // Input sahələrini təmizləyirik
  productNameInput.value = "";
  ProductPriceInput.value = "";

  // Yenilənmiş məlumatları göstəririk
  updateSummary();
}

function addProductToUI(productObj) {
  const product = document.createElement("div");
  product.classList.add("product");

  const productName = document.createElement("div");
  productName.classList.add("productName");
  productName.innerText = `${productObj.name} , ${productObj.price} AZN`;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("productRemove");
  deleteBtn.innerText = "Sil";

  // Append edirik child elementləri (parent divə)
  products.append(product);
  product.append(productName);
  product.append(deleteBtn);

  // Sil düyməsinə basıldıqda məhsulu silmə funksiyası
  deleteBtn.addEventListener("click", () => {
    product.remove();
    total -= productObj.price; // Məhsulun qiymətini total-dan çıxırıq
    count--;

    // Məhsulu localStorage-dan silirik
    removeProductFromLocalStorage(productObj);

    // Yenilənmiş məlumatları göstəririk
    updateSummary();
  });
}

function saveProductToLocalStorage(productObj) {
  let productList = JSON.parse(localStorage.getItem("products")) || [];
  productList.push(productObj);
  localStorage.setItem("products", JSON.stringify(productList));
}

function removeProductFromLocalStorage(productObj) {
  let productList = JSON.parse(localStorage.getItem("products")) || [];
  productList = productList.filter(
    (product) =>
      product.name !== productObj.name || product.price !== productObj.price
  );
  localStorage.setItem("products", JSON.stringify(productList));
}

function loadProductsFromLocalStorage() {
  let productList = JSON.parse(localStorage.getItem("products")) || [];
  productList.forEach((productObj) => {
    addProductToUI(productObj);
    total += productObj.price;
    count++;
  });

  // Yüklənən məlumatları göstəririk
  updateSummary();
}

function updateSummary() {
  totalPrice.innerText = `${total} AZN`;
  productCount.innerText = `${count}`;
}
