import React from 'react';
import {Link} from 'react-router-dom';
import '../scss/wishes.scss'


const Wishes = ({user, wishes, setwishes}) => {
    return (
        <div className='wish_box'>
            <div className='wish_text'>
                <h3>Your Wishes</h3>
            </div>
            {wishes.length === 0 ? <h4>Your wish list is empty</h4> :
                <div className='wish_list'>
                    {wishes.map(el => (
                        <div key={el.id} className='d-flex wish_list_elevent'>
                            <div className='wish_list_img'>
                                <img src={el.img} alt={el.name}/>
                            </div>
                            <div className='wish_list_description'>
                                <h2>{el.name}</h2>
                                <p>{el.description}</p>
                                <Link to={`/product/${el.id}`}>More info</Link>
                            </div>
                            <div className='wish_list_button'>
                                <button>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>}
        </div>
    )
}
// onClick={() => handleCartButtonClick(product)}
export default Wishes