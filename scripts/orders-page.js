import { orders } from '../data/orders.js'
import { formatCurrency } from './utils/money.js'
import { products, getProduct, loadProductsFetch} from '../data/products.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { updateHeaderQuantity } from './header.js';
import {cart} from '../data/cart-class.js';

function prepareOrders(orders) {
  const ordersCopy = [...orders];

  ordersCopy.sort((a, b) =>
    new Date(b.orderTime) - new Date(a.orderTime)
  );

  ordersCopy.forEach(order => {
    order.products = [...order.products].sort((a, b) =>
      new Date(a.estimatedDeliveryTime) -
      new Date(b.estimatedDeliveryTime)
    );
  });

  return ordersCopy;
}


async function renderOrderPage() {
  
  await loadProductsFetch();
  updateHeaderQuantity();
  let orderPageHTML = '';

  const sortedOrders = prepareOrders(orders);




  sortedOrders.forEach((order) => {
    const deliveryDate = dayjs(order.orderTime);
    const dateString = deliveryDate.format(
      'dddd  D'
    );

    const priceString = formatCurrency(order.totalCostCents);

    const orderId = order.id;
    let orderHTML = `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${dateString}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${priceString}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
    `;

    order.products.forEach((product) => {

      const deliveryDate = dayjs(product.estimatedDeliveryTime);
      const dateString = deliveryDate.format(
        'dddd D'
      );
      const currentProduct = getProduct(product.productId);

      orderHTML += `
        <div class="product-image-container">
          <img src="${currentProduct.image}">
        </div>

        <div class="product-details">
          <div class="product-name">${currentProduct.name}</div>
          <div class="product-delivery-date">
            Arriving on: ${dateString}
          </div>
          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${product.productId}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });
    orderHTML += `
        </div>
      </div>
    `;

    orderPageHTML += orderHTML;


  });
  document.querySelector('.js-orders-grid').innerHTML = orderPageHTML;

  document.querySelectorAll('.js-buy-again-button')
  .forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      cart.addToCart(productId);
      updateHeaderQuantity();

      button.innerText = 'Added';
      setTimeout(() => {
        button.innerText = 'Buy it again';
      }, 1000);
    });
  });

}
renderOrderPage();
