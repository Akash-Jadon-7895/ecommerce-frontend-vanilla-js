import {cartQuantity} from '../../data/cart.js';

export function updateHeaderQuantity(){
      const totalQuantity = cartQuantity();

      document.querySelector('.return-to-home-link').innerHTML =
      `${totalQuantity} items`;
    }