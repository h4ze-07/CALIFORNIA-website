import {Link} from "react-router-dom"
import "../scss/catalog.scss"


const Catalog = ({isLoading, products, addToCart, handleFilterBrandChange, handleFilterCategoryChange}) => {


    const handleCartChange = (product) => {
        addToCart(product)
    }


    return (
        <section className="catalog_page">
            <div className="container">
                <div className="catalog_text">
                    <h2 className="">Our Products</h2>
                    {/* category */}
                    <div className='filter'>
                        <button onClick={() => handleFilterCategoryChange('smartphones')}>Phone</button>
                        <button onClick={() => handleFilterCategoryChange('laptop')}>Laptop</button>
                        <button onClick={() => handleFilterCategoryChange('watch')}>Watch</button>
                        <button onClick={() => handleFilterCategoryChange('tablet')}>Tablet</button>
                    </div>
                    {/* brand */}
                    <div className='filter'>
                        <button onClick={() => handleFilterBrandChange('apple')}>Apple</button>
                        <button onClick={() => handleFilterBrandChange('samsung')}>Samsung</button>
                        <button onClick={() => handleFilterBrandChange('lenovo')}>Lenovo</button>
                        <button onClick={() => handleFilterBrandChange('huawei')}>Huawei</button>
                    </div>

                </div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="catalog_box d-flex">

                        {products.map((product) => (
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
                                    <button className=""
                                            onClick={() => handleCartChange(product)}
                                    >Add to cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>)}


            </div>
        </section>
    )
}

export default Catalog