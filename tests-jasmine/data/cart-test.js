import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe("test suite: addToCart", () => {
  it("adds an existing product to the cart", () => {
    spyOn(Storage.prototype, "setItem");

    spyOn(Storage.prototype, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });

    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(2);
  });

  it("adds a new product to the cart", () => {
    spyOn(Storage.prototype, "setItem");

    spyOn(Storage.prototype, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
  });
});

//localStorage in firefox is defined by the html spec as being not modifiable. You can however get around this by accessing localStorage's prototype directly.The cross browser solution is to mock the objects on Storage.prototype e.g.

//nstead of spyOn(localStorage, 'setItem') use

//spyOn(Storage.prototype, 'setItem')
//spyOn(Storage.prototype, 'getItem')
