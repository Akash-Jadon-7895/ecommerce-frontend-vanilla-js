import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { updateHeaderQuantity } from "./header.js";
import '../data/cart-class.js';
// import '../data/backend-practice.js'
import {loadProductsFetch } from "../data/products.js";
import {orders} from '../data/orders.js'

async function loadPage(){
  try{
    await loadProductsFetch();
  } catch (error){
    console.log('Unexpexted error. Please try again');
  }
  

  
  renderOrderSummary();
  renderPaymentSummary();
  updateHeaderQuantity();

}
loadPage();

console.log(orders[0]);


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
