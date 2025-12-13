import {renderOrderSummary } from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import {updateHeaderQuantity} from "./header.js";
import '../data/cart-class.js';

renderOrderSummary();
renderPaymentSummary();
updateHeaderQuantity();