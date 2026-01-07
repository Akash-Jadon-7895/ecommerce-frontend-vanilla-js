import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';

describe('Delivery Options', () => {

  it('returns correct delivery option by id', () => {
    const option = getDeliveryOption('2');

    expect(option.id).toEqual('2');
    expect(option.deliveryDays).toEqual(3);
    expect(option.priceCents).toEqual(499);
  });

  it('returns default option if id does not exist', () => {
    const option = getDeliveryOption('invalid-id');

    expect(option.id).toEqual('1');
    expect(option.deliveryDays).toEqual(7);
    expect(option.priceCents).toEqual(0);
  });

  it('contains all delivery options', () => {
    expect(deliveryOptions.length).toEqual(3);
  });

});
