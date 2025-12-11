import {renderOrderSummary } from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import {updateHeaderQuantity} from "./header.js";

renderOrderSummary();
renderPaymentSummary();
updateHeaderQuantity();