import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { cart } from "../../data/cart-class.js";
import { loadProducts } from "../../data/products.js";  


describe('test suite: renderOrderSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeAll((done) => {
    loadProducts(() =>{
      done();
    });
  });



  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
      <div class="return-to-home-link"></div>
    `;

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        { productId: productId1, quantity: 2, deliveryOptionId: '1' },
        { productId: productId2, quantity: 1, deliveryOptionId: '2' }
      ]);
    });

    cart.cartItems = JSON.parse(localStorage.getItem('cart'));

    renderOrderSummary();
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('displays all cart items', () => {
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);
  });

  it('displays correct quantities', () => {
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('2');

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('1');
  });

  it('displays product names and prices', () => {
    expect(
      document.querySelectorAll('.product-name').length
    ).toEqual(2);

    expect(
      document.querySelectorAll('.product-price').length
    ).toEqual(2);
  });

  
  it('removes a product when delete is clicked', () => {
    document
      .querySelector(`.js-delete-link-${productId1}`)
      .click();

    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);

    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);

    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId2);
  });


  it('shows delivery options for each cart item', () => {
    expect(
      document.querySelectorAll('.js-delivery-option').length
    ).toBeGreaterThan(0);
  });

  it('updates delivery option when clicked', () => {
    const deliveryOption = document.querySelector(
      `.js-delivery-option[data-product-id="${productId1}"]`
    );

    deliveryOption.click();

    const matchingItem = cart.cartItems.find(
      item => item.productId === productId1
    );

    expect(matchingItem.deliveryOptionId).toBeDefined();
  });

  it('switches to input when update is clicked', () => {
    document.querySelector('.js-update-link').click();

    expect(
      document.querySelector('.quantity-input')
    ).not.toEqual(null);

    expect(
      document.querySelector('.js-save-quantity-link')
    ).not.toEqual(null);
  });

  it('updates quantity when save is clicked', () => {
    document.querySelector('.js-update-link').click();

    const input = document.querySelector('.quantity-input');
    input.value = 5;

    document.querySelector('.js-save-quantity-link').click();

    const matchingItem = cart.cartItems.find(
      item => item.productId === productId1
    );

    expect(matchingItem.quantity).toEqual(5);
  });

  it('re-renders updated quantity in the DOM', () => {
    document.querySelector('.js-update-link').click();

    const input = document.querySelector('.quantity-input');
    input.value = 4;

    document.querySelector('.js-save-quantity-link').click();

    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('4');
  });
});
