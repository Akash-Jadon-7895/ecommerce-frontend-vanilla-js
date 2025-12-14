import { cart } from '../../data/cart-class.js';

describe('Cart class', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: '1'
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: '2'
        }
      ]);
    });

    spyOn(localStorage, 'setItem');
    cart.cartItems = JSON.parse(localStorage.getItem('cart'));
  });

  it('loads cart items from localStorage', () => {
    expect(cart.cartItems.length).toEqual(2);
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[1].productId).toEqual(productId2);
  });

  it('adds a new product to the cart', () => {
    cart.addToCart('product-3');

    expect(cart.cartItems.length).toEqual(3);
    expect(cart.cartItems[2].productId).toEqual('product-3');
    expect(cart.cartItems[2].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('increments quantity if product already exists', () => {
    cart.addToCart(productId1);

    expect(cart.cartItems.length).toEqual(2);
    expect(cart.cartItems[0].quantity).toEqual(3);
  });

  it('removes a product from the cart', () => {
    cart.removeFromCart(productId1);

    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId2);
  });

  it('updates product quantity', () => {
    cart.updateQuantity(productId1, 5);

    expect(cart.cartItems[0].quantity).toEqual(5);
  });

  it('updates delivery option', () => {
    cart.updateDeliveryOption(productId2, '3');

    expect(cart.cartItems[1].deliveryOptionId).toEqual('3');
  });

  it('calculates total cart quantity', () => {
    const total = cart.cartQuantity();
    expect(total).toEqual(3);
  });

  it('saves updated cart to localStorage', () => {
    cart.addToCart('product-4');

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart',
      jasmine.any(String)
    );
  });
});