import { addToCart, updateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let productHTML = "";
products.forEach((product) => {
  //html generator
  productHTML += `
  <div class="product-container">
  <div class="product-image-container">
    <img class="product-image"
      src="${product.image}">
  </div>

  <div class="product-name limit-text-to-2-lines">
    ${product.name}
  </div>

  <div class="product-rating-container">
    <img class="product-rating-stars"
      src="${product.getStarsUrl()}">
    <div class="product-rating-count link-primary">
      ${product.rating.count}
    </div>
  </div>

  <div class="product-price">
    ${product.getPrice()}
  </div>

  <div class="product-quantity-container">
    <select id="js-selector-${product.id}">
      <option selected value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
    </select>
  </div>

  ${product.extraInfoHTML()}
  <div class="product-spacer"></div>

  <div class="added-to-cart" id="js-added-to-cart-${product.id}">
    <img src="images/icons/checkmark.png">
    Added
  </div>

  <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
    product.id
  }">
    Add to Cart
  </button>
</div>`;
});

//putting html into he webpage
document.getElementById("js-product-grid").innerHTML = productHTML;

//updating the total cart quatity
function updateCart() {
  let cartQuantity = 0;
  cartQuantity = updateCartQuantity(cartQuantity);
  document.getElementById("js-cart-quantity").innerText = cartQuantity;
}
updateCart();

//making added to cart visible on click
function addedToCart(productId, addedButtonTimeoutId) {
  const addedToCart = document.getElementById(`js-added-to-cart-${productId}`);
  addedToCart.classList.add("added-to-cart-visible");

  if (addedButtonTimeoutId) clearTimeout(addedButtonTimeoutId);

  let timeoutId = setTimeout(() => {
    addedToCart.classList.remove("added-to-cart-visible");
  }, 2000);

  addedButtonTimeoutId = timeoutId;
  return addedButtonTimeoutId;
}

//adding event lisenter to all add to cart buttons
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  let addedButtonTimeoutId;
  button.addEventListener("click", () => {
    // const productId = button.dataset.productId;
    const { productId } = button.dataset;
    addToCart(productId);
    updateCart();
    addedButtonTimeoutId = addedToCart(productId, addedButtonTimeoutId);
  });
});
