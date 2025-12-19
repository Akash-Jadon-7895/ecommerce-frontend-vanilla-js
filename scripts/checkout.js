import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { updateHeaderQuantity } from "./header.js";
import '../data/cart-class.js';
// import '../data/backend-practice.js'
import {loadProductsFetch } from "../data/products.js";

async function loadPage(){
  try{
    await loadProductsFetch();
  } catch (error){
    console.log('Unexpexted error. Please try again later');
  }
  

  
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
