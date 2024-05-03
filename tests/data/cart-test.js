import {
  addToCart,
  cart,
  loadFromStorage,
  removeFromCart,
  updateDeliveryOption,
} from "../../data/cart.js";

describe("test suite: addToCart", () => {
  beforeEach(() => {
    document.querySelector(".js-test-container").innerHTML = `
  <input id="js-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6" value="1" ;">
    `;

    spyOn(Storage.prototype, "setItem");
  });

  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = `
    `;
  });

  it("adds an existing product to the cart", () => {
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
    expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1);
    expect(Storage.prototype.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
      ])
    );
  });

  it("adds a new product to the cart", () => {
    spyOn(Storage.prototype, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
    expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1);
    expect(Storage.prototype.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptions: "1",
        },
      ])
    );
  });
});

//localStorage in firefox is defined by the html spec as being not modifiable. You can however get around this by accessing localStorage's prototype directly.The cross browser solution is to mock the objects on Storage.prototype e.g.

//nstead of spyOn(localStorage, 'setItem') use

//spyOn(Storage.prototype, 'setItem')
//spyOn(Storage.prototype, 'getItem')

describe("test suite: removeFromCart", () => {
  beforeEach(() => {
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
  });

  it("removes a product from the cart", () => {
    removeFromCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(0);
    expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1);
    expect(Storage.prototype.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([])
    );
  });

  it("does nothing if product is not in the cart", () => {
    removeFromCart("does-not-exist");
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
    expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1);
    expect(Storage.prototype.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ])
    );
  });
});

describe("test suite: updateDeliveryOptions", () => {
  beforeEach(() => {
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
  });

  it("updates the delivery options", () => {
    updateDeliveryOption("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", "3");
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual("3");
    expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1);
    expect(Storage.prototype.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "3",
        },
      ])
    );
  });

  it("does nothing if the product is not in the cart", () => {
    updateDeliveryOption("doesnot exists", "3");
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual("1");
    expect(Storage.prototype.setItem).toHaveBeenCalledTimes(0);
    
  });

  it('does nothing if the deliveryOption does not exits', () => {
    updateDeliveryOption("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", "4");
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual("1");
    expect(Storage.prototype.setItem).toHaveBeenCalledTimes(0);
    
  })
});
