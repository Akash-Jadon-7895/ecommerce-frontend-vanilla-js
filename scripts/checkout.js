import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { updateHeaderQuantity } from "./header.js";
import '../data/cart-class.js';
// import '../data/backend-practice.js'
import {loadProductsFetch } from "../data/products.js";

async function loadPage(){

  await loadProductsFetch();
  renderOrderSummary();
  renderPaymentSummary();
  updateHeaderQuantity();

}
loadPage();


// loadProductsFetch().then(() => {
//   renderOrderSummary();
//   renderPaymentSummary();
//   updateHeaderQuantity();
// });

// loadProducts(() => {
//   renderOrderSummary();
//   renderPaymentSummary();
//   updateHeaderQuantity();
// });
