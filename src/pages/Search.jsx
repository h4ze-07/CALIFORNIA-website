import { Link } from "react-router-dom"

const Search = ({searchProducts}) => {
  return (
    <div>
        {
            searchProducts.map((product) => (
                <div key={product.id} href={product.href} className="catalog_card">
                <div className="catalog_card_img">
                  <img src={product.img}/>
                </div>
                <div className="catalog_card_text">
                  <h3>{product.name}</h3>
                  <p>$ {product.price}</p>
                  <button className="">
                    <Link to={`/product/${product.id}`}>More info</Link>
                  </button>
                  <button className="" onClick={() => handleCartChange(product)}>
                    Add to cart
                  </button>
                </div>
              </div>
            ))
        }
    </div>
  )
}

export default Search