export let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
      deliveryOptionId: "1",
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 2,
      deliveryOptionId: "2",
    },
  ];
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) matchingItem = cartItem;
    //here we are actualy creating a reference to matching object , so change in the matching  object can be done
  });

  //getting the quantity by dropdown selector and changing to number
  const quantity = Number(
    document.getElementById(`js-selector-${productId}`).value
  );

  //updating the cart
  if (matchingItem) matchingItem.quantity += quantity;
  else
    cart.push({
      productId: productId,
      quantity: quantity,
      deliveryOptions: "1",
    });

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) newCart.push(cartItem);
    cart = newCart;
  });
  saveToStorage();
}

export function updateCartQuantity(cartQuantity) {
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

//function to update single cart item in checkout page
export function updateQuantity(productId, newQuantity) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) matchingItem = cartItem;
  });

  if (newQuantity <= 0 || newQuantity >= 1000) {
    document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
      matchingItem.quantity;
    newQuantity <= 0
      ? alert("Enter valid input")
      : alert("Quantity should be less than 1000");
    return;
  } else {
    matchingItem.quantity = newQuantity;
    document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
      matchingItem.quantity;
  }
  saveToStorage();
}
