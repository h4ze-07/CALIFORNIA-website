import {Link} from "react-router-dom"
import "../scss/catalog.scss"


const Catalog = ({products, addToCart}) => {


    const handleCartChange = (product) => {
        addToCart(product)
    }

    return (
        <section className="catalog_page">
            <div className="container">
                <div className="catalog_text">
                    <h2 className="">Our Products</h2>
                </div>
                <div className="catalog_box d-flex">
                    {products.map((product) => (
                        <a key={product.id} href={product.href} className="catalog_card">
                            <div className="catalog_card_img">
                                <img src={product.img}/>
                            </div>
                            <div className="catalog_card_text">
                                <h3>{product.name}</h3>
                                <p>$ {product.price}</p>
                                <button className="">
                                    <Link to={`/product/${product.id}`}>More info</Link>
                                </button>
                                <button className=""
                                        onClick={() => handleCartChange(product)}
                                >Add to cart
                                </button>
                            </div>
                        </a>
                    ))}
                </div>


            </div>
        </section>
    )
}

export default Catalog