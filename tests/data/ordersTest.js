import { orders, addOrder } from '../../data/orders.js';

describe('Orders', () => {

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    orders.length = 0; // clear existing orders
  });

  it('adds a new order to the beginning of orders list', () => {
    const order = {
      id: 'order-1',
      total: 2500
    };

    addOrder(order);

    expect(orders.length).toEqual(1);
    expect(orders[0].id).toEqual('order-1');
  });

  it('saves orders to localStorage', () => {
    addOrder({ id: 'order-2' });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'orders',
      jasmine.any(String)
    );
  });

});
