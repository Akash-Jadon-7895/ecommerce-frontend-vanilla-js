import {cart} from '../data/cart-class.js'

export function updateHeaderQuantity(){
  const totalQuantity = cart.cartQuantity();

  const homeLink = document.querySelector('.return-to-home-link');
  if (homeLink) {
    homeLink.innerHTML = `${totalQuantity} items`;
  }

  const cartQuantity = document.querySelector('.js-cart-quantity');
  if (cartQuantity) {
    cartQuantity.innerHTML = totalQuantity;
  }
}
