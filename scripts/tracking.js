import { orders } from '../data/orders.js';
import { getProduct, loadProductsFetch } from '../data/products.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { updateHeaderQuantity } from './header.js';


const url = new URL(window.location.href);

const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');


const order = orders.find(order => order.id === orderId);

if (!order) {
  document.body.innerHTML = '<h2>Order not found</h2>';
  throw new Error('Order not found');
}

const productInOrder = order.products.find(
  item => item.productId === productId
);

if (!productInOrder) {
  document.body.innerHTML = '<h2>Product not found</h2>';
  throw new Error('Product not found');
}


await loadProductsFetch();
updateHeaderQuantity();

const product = getProduct(productId);

document.querySelector('.js-product-name').innerHTML = product.name;

document.querySelector('.js-product-quantity').innerHTML =
  `Quantity: ${productInOrder.quantity}`;

document.querySelector('.js-product-image').src = product.image;

const now = dayjs();
const deliveryDate = dayjs(productInOrder.estimatedDeliveryTime);

document.querySelector('.js-delivery-date').innerHTML =
  `Arriving on ${deliveryDate.format('dddd, MMMM D')}`;

let status;

const preparingUntil = deliveryDate.subtract(3, 'day');

if (now.isBefore(preparingUntil)) {
  status = 'preparing';
} else if (now.isBefore(deliveryDate)) {
  status = 'shipped';
} else {
  status = 'delivered';
}


document
  .querySelector(`.progress-label.${status}`)
  .classList.add('current-status');

const progressBar = document.querySelector('.progress-bar');

if (status === 'preparing') progressBar.style.width = '33%';
if (status === 'shipped') progressBar.style.width = '66%';
if (status === 'delivered') progressBar.style.width = '100%';


