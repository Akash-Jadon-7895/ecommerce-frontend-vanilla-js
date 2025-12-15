import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { updateHeaderQuantity } from "./header.js";
import '../data/cart-class.js';
// import '../data/backend-practice.js'
import { loadProducts } from "../data/products.js";

loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
  updateHeaderQuantity();
});
