import {Link, useNavigate} from "react-router-dom"
import {useEffect} from "react";
import '../scss/search.scss'

const Search = ({searchProducts, cart, setCart, addToCart, scrollToTop}) => {

    const navigate = useNavigate();

    const handleCartChange = (product) => {
        const testProduct = cart.find((item) => item.productId === product.id);
        if (testProduct) {
            const updatedItems = cart.map((item) =>
                item.productId === product.id
                    ? {...item, quantity: item.quantity + 1}
                    : item
            );
            setCart(updatedItems);
        } else {
            addToCart({
                cartId: cart.length === 0 ? 1 : cart[cart.length - 1].cartId + 1,
                productId: product.id,
                quantity: 1,
                price: product.price,
                allInfo: product,
            });
        }
        navigate('/cart');
    };

    useEffect(() => {
        scrollToTop()
    }, [])

    return (
        <div className='search_page container d-flex'>
            {
                searchProducts.map((product) => (
                    <div key={product.id} href={product.href} className="search_page_card">
                        <div className="search_page_img">
                            <img src={product.img}/>
                        </div>
                        <div className="search_page_text">
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