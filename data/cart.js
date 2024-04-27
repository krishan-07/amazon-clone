export const cart = [];

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
  else cart.push({ productId: productId, quantity: quantity });
}
