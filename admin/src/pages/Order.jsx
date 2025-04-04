/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { assets } from '../assets/admin_assets/assets';

function Order({ token }) {
  const [orders, setOrders] = useState([]);

  const loadOrder = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/order/list');
      console.log(response.data);

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        console.log('Erreur : pas de commande');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const statusHandler = async (e, orderId) => { 
    try {
      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: e.target.value });
      
      if(response.data.success) {
        console.log("Status updated successfully");
        await loadOrder();
      }
    } catch (error) {
      console.log(error.message);
      
    }
  }
  useEffect(() => {
    loadOrder();
  }, []);

  return (
    <div>
      <h3>Order page</h3>
      <div>
        {orders.map((order, orderIndex) => (
          <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 text-xs sm:text-sm text-gray-700' key={orderIndex}>
            <img className='w-12' src={assets.parcel_icon} alt="Parcel Icon" />
            <div>
              <div>
                {
                  order.items.map((item, itemIndex) => {
                  if (itemIndex === order.items.length - 1) {
                    return (
                      <p className='py-0.5' key={itemIndex}>
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                      )
                  } else {
                    return (
                      <p className='py-0.5' key={itemIndex}>
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    )}
                  })
                }
              </div> 
              <p  className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
              <div>
                <p>{ order.address.street + ","}</p>
                <p>{ order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <div>{ order.address.phone}</div>
            </div>

            <div>
              <p className='text-sm sm:text-[15px]'>Items : {order.items.length }</p>
              <p className='mt-3'>Method : { order.paymentMethod}</p>
              <p>Paymet : {order.payment ? "Done" : "Pending"}</p>
              <p>Date : {new Date (order.date).toLocaleDateString() }</p>
            </div>
            <p className='text-sm sm:text-[15px]'>{currency} {order.amount}</p>
            <select onChange={(e) => statusHandler(e, order._id )} value={order.status} className='p-2 font-semibold'>
              <option value="OrderPlaced"> Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out of delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Order;
