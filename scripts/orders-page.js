import {orders} from '../data/orders.js'

function prepareOrders(orders) {
  orders.sort((a, b) =>
    new Date(b.orderTime) - new Date(a.orderTime)
  );

  orders.forEach(order => {
    order.products.sort((a, b) =>
      new Date(a.estimatedDeliveryTime) -
      new Date(b.estimatedDeliveryTime)
    );
  });

  return orders;
}

function renderOrderPage(){
  let orderPageHTML = '';

  sortedOrders = prepareOrders(orders);




  orders.forEach((order) =>{
    let orderHeaderHTML = '';
    const deliveryDate = order.orderTime;
    const dateString = deliveryDate.format(
      'dddd, D'
    );

    
  })




}
