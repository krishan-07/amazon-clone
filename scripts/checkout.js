import { renderOrderSummary } from "./checkout/orderSummay.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProductsFetch, loadProducts } from "../data/products.js";
// import "../data/cart-class.js"
// import "../data/backend-practice.js"

async function loadPage() {
  try {
    // throw 'error';
    await loadProductsFetch();
  } catch (error) {
    console.log("error!");
  }

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();

/*
loadProductsFetch().then((value) => {
  // console.log(value);
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/
/*
loadProducts(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

//we can group promises using Promise.all() method and then(values) method can get an array of values from different resolve and it takes an array of promises
