import React, { useEffect, useState } from 'react'
import {DB_URL} from '../firebase';
import '../scss/orders.scss'

const Orders = ({user}) => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders =  async () => {
            const response = await fetch(`${DB_URL}/users/${user.userId}/orders.json`)
            const ordersData = await response.json()
            let loadedOrders = [];
            for (const key in ordersData) {
                loadedOrders.push(ordersData[key]);
            }
            setOrders(loadedOrders);
        }
        fetchOrders()  
    }, [user])

  return (
    <div className='orders_page'>
            {orders.length > 0 ?
                <>
                    <div className='orders_page_text'>
                        <h3>Your orders:</h3>
                    </div>
                    <div>
                        {orders.map(el => (
                            <div>
                                <p className='date_element'>{el.date}</p>
                                <div className='orders_element'>
                                    {el.items.map(i => (
                                        <div className='orders_element_item d-flex' key={el.cartId}>
                                            <div className='orders_element_img'>
                                                <img src={i.allInfo.img} alt={i.allInfo.name} />
                                            </div>
                                            <div className='orders_element_description d-flex'>
                                                <h4>{i.allInfo.name}</h4>
                                                <p>{i.price}$</p>
                                            </div>
                                        </div>))}
                                </div>
                            </div>
                        ))}
                    </div>
                </>  
            : 
                <p>
                    You have no previous orders!
                </p>
            }
    </div>
  )
}

export default Orders