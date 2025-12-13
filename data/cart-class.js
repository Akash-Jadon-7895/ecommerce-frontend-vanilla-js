class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }


  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem
      }
    });

    if (matchingItem) {
      matchingItem.quantity++;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;

    this.saveToStorage();

  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem
      }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }

  updateQuantity(productId, newQuantity) {
    this.cartItems.forEach(item => {
      if (item.productId === productId) {
        item.quantity = newQuantity;
      }
    });

    this.saveToStorage();
  }

  cartQuantity() {
    let totalQuantity = 0;

    this.cartItems.forEach(item => {
      totalQuantity += item.quantity;
    });
    return totalQuantity;

  }


}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-bussiness');




console.log(cart);
console.log(businessCart);
