import {cart} from '../../data/cart-class.js';

export function updateHeaderQuantity(){
      const totalQuantity = cart.cartQuantity();

      document.querySelector('.return-to-home-link').innerHTML =
      `${totalQuantity} items`;
    }