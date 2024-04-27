export const cart = [
  {
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:1
  },
  {
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity:2
  }
];

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
