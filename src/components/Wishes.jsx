import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import '../scss/wishes.scss'
import {DB_URL} from '../firebase';
import { db } from '../firebase';
import { ref, remove } from 'firebase/database';

const Wishes = ({user}) => {
    const [w, setW] = useState([]);    

    const handleDeleteFromWishes = (id) => {
        const refTr = ref(db, 'users/' + user.userId + '/wishes/' + id)
        remove(refTr)
        .then(() => {
            console.log('Deleted');
            fetchWishes()
        })
        .catch((error) => {
            console.error('Some error:', error);
        });
    }

    useEffect(() => {
        fetchWishes()  
    }, [user])

    const fetchWishes =  async () => {
        const response = await fetch(`${DB_URL}/users/${user.userId}/wishes.json`)
        const wishesData = await response.json()
        let loadedWishes = [];
        for (const key in wishesData) {
            loadedWishes.push(wishesData[key]);
        }
        setW(loadedWishes);
    }

    console.log(w);

    return (
        <div className='wish_box'>
            <div className='wish_text'>
                <h3>Your Wishes</h3>
            </div>
            {w.length === 0 ? <h4>Your wish list is empty</h4> :
                <div className='wish_list'>
                    {w.map(el => (
                        <div key={el.product.id} className='d-flex wish_list_elevent'>
                            <div className='wish_list_img'>
                                <img src={el.product.img} alt={el.product.name}/>
                            </div>
                            <div className='wish_list_description'>
                                <h2>{el.product.name}</h2>
                                <p>{el.product.description}</p>
                                <Link to={`/product/${el.product.id}`}>More info</Link>
                            </div>
                            <div className='wish_list_button'>
                                <button onClick={() => handleDeleteFromWishes(el.product.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>}
        </div>
    )
}
// onClick={() => handleCartButtonClick(product)}
export default Wishes