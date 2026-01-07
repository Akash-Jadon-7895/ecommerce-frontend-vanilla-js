import { products, loadProductsFetch, getProduct } from '../../data/products.js';

describe('Products', () => {

  beforeEach(() => {
    spyOn(window, 'fetch').and.returnValue(
      Promise.resolve({
        json: () => Promise.resolve([
          {
            id: 'product-1',
            image: 'image.png',
            name: 'Test Product',
            rating: { stars: 4 },
            priceCents: 1000
          }
        ])
      })
    );
  });

  it('loads products from backend', async () => {
    await loadProductsFetch();

    expect(products.length).toEqual(1);
    expect(products[0].id).toEqual('product-1');
  });

  it('returns matching product by id', async () => {
    await loadProductsFetch();

    const product = getProduct('product-1');

    expect(product.name).toEqual('Test Product');
    expect(product.priceCents).toEqual(1000);
  });

});
