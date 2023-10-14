import React from 'react';
import { Link } from 'react-router-dom';


const Wishes = ({user, wishes, setwishes}) => {


   






  return ( 
    <div style={{marginTop: '100px'}}>
       <h1 >My Wishes</h1>
        {wishes.length === 0 ? <h3>Your wish list is empty</h3> :
          <div className='list-wrap'>
            {wishes.map(el => (
              <div key={el.id} >
                <div >
                  <img src={el.img} alt={el.name} />
                </div>
                <div >
                    <h2>{el.name}</h2>
                    <p>{el.description}</p>
                    <Link to={`/product/${el.id}`}>More info</Link>
                    <button>Delete from wishes!</button>
                </div>
              </div>
            ))}
          </div>}
        </div>
  )
}
// onClick={() => handleCartButtonClick(product)}
export default Wishes