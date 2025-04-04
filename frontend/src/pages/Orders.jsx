import React, { useContext,  useEffect,  useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios, { all } from 'axios';

function Orders() {
  const { products, currency, backendUrl, token} = useContext(ShopContext);

  const [orders, setOrders] = useState([]);

  const loadOrderData = async () => {
    const data = await axios.get(backendUrl + '/api/order/userOrders', { headers: { Authorization: `Bearer ${token}` } })
    console.log(data.data);

    if (data.data.success) {
      let allOrderItem = []

      data.data.orders.map((order) => (
        order.items.map((item) => (
          item['status'] = order.status,
          item['payment'] = order.payment,
          item['paymentMethod'] = order.paymentMethod,
          item['date'] = order.date,
          allOrderItem.push(item)
        ))
      ))

      setOrders(allOrderItem.reverse());
      
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [])

  console.log('================== order ======================');
  console.log(orders);
  
  return (
    <div>
      <div className="border-t pt-16">
        <div className="text-2xl">
          <Title text1={'MY'} text2={'ORDERS'} />
        </div>

        <div className="">
          {
            orders.map((item, index) => (
            <div key={index} className='py-4 border-b text-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-4'>
              
              <div className="flex items-start gap-6 text-sm">
                <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-500">
                    <p className='text-lg'>{currency}{item.price}</p>
                    <p>Quantity : { item.quantity}</p>
                      <p>Size : { item.size}</p>
                  </div>
                  <p>
                      Date <span className='text-gray-400'> : { new Date(item.date).toDateString()}</span>
                  </p>
                  <p>
                      payment <span className='text-gray-400'> : { item.paymentMethod}</span>
                  </p>
                </div>
              </div>

              <div className='w-1/2 flex justify-between'>

                <div className="flex items-center gap-2">
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                    <p className='text-sm'>{ item.status}</p>
                </div>
                <button  onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>TRACK ORDER</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;