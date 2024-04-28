import {
  cart,
  removeFromCart,
  updateCartQuantity,
  updateQuantity,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let cartSummaryHTML = "";
cart.forEach((cartItem) => {
  const { productId } = cartItem;
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) matchingProduct = product;
  });

  cartSummaryHTML += `<div class="cart-item-container 
  js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-quantity-label-${
              matchingProduct.id
            }">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-quantity-link"
          data-product-id="${matchingProduct.id}">
            Update
          </span>
          <input class="quantity-input js-quantity-input-${matchingProduct.id}">
            <span class="save-quantity-link link-primary js-save-quantity-link"
            data-product-id="${matchingProduct.id}">Save</span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
            matchingProduct.id
          }">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
});

document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

//function to update cart quantity
function updateCart() {
  let cartQuantity = 0;
  cartQuantity = updateCartQuantity(cartQuantity);
  document.querySelector(".js-update-cart").innerHTML = `${cartQuantity} items`;
}
updateCart();

//function to delete cart item
document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    removeFromCart(productId);
    container.remove();
    updateCart();
  });
});

//function to update the cart item quantity
document.querySelectorAll(".js-update-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.add("is-editing-quantity");

    //function to save updated cart item when clicked enter
    const productQuantity = document.querySelector(
      `.js-quantity-input-${productId}`
    );
    productQuantity.focus();
    productQuantity.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const newProductQuantity = Number(productQuantity.value);
        productQuantity.value = "";

        updateQuantity(productId, newProductQuantity);
        updateCart();
        container.classList.remove("is-editing-quantity");
      }
    });
  });
});

//function to save the updated cart item when clicked on save button
document.querySelectorAll(".js-save-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.remove("is-editing-quantity");

    //getting value from update qauntity field
    const productQuantity = document.querySelector(
      `.js-quantity-input-${productId}`
    );
    const newProductQuantity = Number(productQuantity.value);
    productQuantity.value = "";

    updateQuantity(productId, newProductQuantity);
    updateCart();
  });
});
