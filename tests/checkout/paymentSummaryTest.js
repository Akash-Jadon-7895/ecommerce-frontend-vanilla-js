import { renderPaymentSummary } from '../../scripts/checkout/paymentSummary.js';
import { cart } from '../../data/cart-class.js';
import { loadProductsFetch } from '../../data/products.js';

describe('test suite: renderPaymentSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeAll((done) => {
    loadProductsFetch().then(() => done());
  });

  beforeEach(() => {
    // mock localStorage
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        { productId: productId1, quantity: 2, deliveryOptionId: '1' },
        { productId: productId2, quantity: 1, deliveryOptionId: '2' }
      ]);
    });

    // setup DOM
    document.querySelector('.js-test-container').innerHTML = `
      <div class="payment-summary js-payment-summary"></div>
    `;

    // load cart
    cart.cartItems = JSON.parse(localStorage.getItem('cart'));

    // render
    renderPaymentSummary();
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('renders Order Summary title', () => {
    expect(
      document.querySelector('.js-payment-summary').innerText
    ).toContain('Order Summary');
  });

  it('renders correct item count', () => {
    expect(
      document.querySelector('.js-payment-summary').innerText
    ).toContain('Items (3)');
  });

  it('renders shipping text', () => {
    expect(
      document.querySelector('.js-payment-summary').innerText
    ).toContain('Shipping');
  });

  it('renders estimated tax', () => {
    expect(
      document.querySelector('.js-payment-summary').innerText
    ).toContain('Estimated tax');
  });

  it('renders order total', () => {
    expect(
      document.querySelector('.js-payment-summary').innerText
    ).toContain('Order total');
  });

  it('renders Place Order button (without clicking)', () => {
    expect(
      document.querySelector('.js-place-order')
    ).not.toEqual(null);
  });
});
