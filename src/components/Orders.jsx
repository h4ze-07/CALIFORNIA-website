import React, { useEffect, useState } from 'react'
import {DB_URL} from '../firebase';

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
    })

  return (
    <div style={{marginTop:'100px'}}>
            {orders.length > 0 ?
                <>
                    <h2>Orders:</h2>
                    <div>
                        {orders.map(el => (
                            <div>
                                <p>{el.date}</p>
                                <div>
                                    {el.items.map(i => (
                                        <div key={el.cartId}>
                                            <img src={i.allInfo.img} alt={i.allInfo.name} />
                                            <p>{i.allInfo.name}</p>
                                            <p>{i.price}</p>
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