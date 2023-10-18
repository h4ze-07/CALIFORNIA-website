import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import {ref, orderByChild, equalTo, query, get} from "firebase/database";
import {db} from '../firebase'
import { BsSuitHeart } from "react-icons/bs";

import "../scss/catalog.scss";
import SuccessWish from "../components/SuccessWish";
import ExistedWish from "../components/ExistedWish";
import SignForWish from "../components/SignForWish";

const Catalog = ({
                     isLoading,
                     cart,
                     setCart,
                     addToCart,
                     scrollToTop,
                     registerForWish, 
                     existedWish, 
                     successWish,
                     handleRegisterForWishClose, 
                     handleExistedWishClose, 
                     handleSuccessWishClose, 
                     handleWishes,
                     currentWishProduct
                 }) => {
    const navigate = useNavigate();
    const {category} = useParams();
    // console.log(category)
    const [productsInCatalog, setProductsInCatalog] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dbRef = ref(db, 'products');

    function mergeProducts(productsByCategory, productsByBrand) {
        const mergedProducts = {};

        for (const productId in productsByCategory) {
            if (productId in productsByBrand) {
                mergedProducts[productId] = productsByCategory[productId];
            }
        }
        return mergedProducts;
    }

    const loadFilteredProducts = async () => {
        const productsRef = dbRef;
        const snapshotAll = await get(productsRef);
        const allProducts = snapshotAll.exists() ? snapshotAll.val() : {};

        let filteredQuery = productsRef;
        if (selectedCategory) {
            filteredQuery = query(productsRef, orderByChild('category'), equalTo(selectedCategory));
        }

        const snapshotByCategory = await get(filteredQuery);

        filteredQuery = productsRef;
        if (selectedBrand) {
            filteredQuery = query(productsRef, orderByChild('brand'), equalTo(selectedBrand));
        }

        const snapshotByBrand = await get(filteredQuery);

        const productsByCategory = snapshotByCategory.exists() ? snapshotByCategory.val() : {};
        const productsByBrand = snapshotByBrand.exists() ? snapshotByBrand.val() : {};

        const mergedProducts = mergeProducts(productsByCategory, productsByBrand);

        const finalProducts = mergedProducts || allProducts;

        const productsArray = [];
        const productKeys = Object.keys(finalProducts)
        for (const key of productKeys) {
            const product = finalProducts[key]
            productsArray.push({...product, id: key})
        }
        setProductsInCatalog(productsArray);
    };

    useEffect(() => {
        loadFilteredProducts();
    }, [selectedCategory, selectedBrand]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        // setSelectedBrand(null); 
        // loadFilteredProducts();
    };

    const handleBrandChange = (brand) => {
        setSelectedBrand(brand);
        // setSelectedCategory(null); 
        // loadFilteredProducts();
    };
    const handleClearFilter = () => {
        setSelectedCategory(null);
        setSelectedBrand(null); 
        navigate('/catalog')
      }

    const filteredProducts = productsInCatalog ? (
        productsInCatalog.filter((product) => {
            return category ? product.category === category : true;
        })
    ) : [];

    const productsToDisplay = filteredProducts.slice(startIndex, endIndex);

    const handleWishesChange = (product) => {
        handleWishes(product)
        setIsModalOpen(true);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
        scrollToTop()
    };

    const goToNextPage = () => {
        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
        scrollToTop()
    };

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
        <section className="catalog_page">
            <div className="container">
                <div className="catalog_text">
                    <h2 className="">Our Products</h2>
                    <div className="filter">
                        <button onClick={() => handleCategoryChange("smartphones")}
                                className={`button-filter ${selectedCategory === "smartphones" ? "active" : "inactive"}`}>Phone</button>
                        <button onClick={() => handleCategoryChange("laptop")}
                                className={`button-filter ${selectedCategory === "laptop" ? "active" : "inactive"}`}>Laptop</button>
                        <button onClick={() => handleCategoryChange("watch")}
                                className={`button-filter ${selectedCategory === "watch" ? "active" : "inactive"}`}>Watch</button>
                        <button onClick={() => handleCategoryChange("tablet")}
                                className={`button-filter ${selectedCategory === "tablet" ? "active" : "inactive"}`}>Tablet</button>
                    </div>
                    <div className="filter">
                        <button onClick={() => handleBrandChange("apple")}
                                className={`button-filter ${selectedBrand === "apple" ? "active" : "inactive"}`}>Apple</button>
                        <button onClick={() => handleBrandChange("samsung")}
                                className={`button-filter ${selectedBrand === "samsung" ? "active" : "inactive"}`}>Samsung</button>
                        <button onClick={() => handleBrandChange("lenovo")}
                                className={`button-filter ${selectedBrand === "lenovo" ? "active" : "inactive"}`}>Lenovo</button>
                        <button onClick={() => handleBrandChange("huawei")}
                                className={`button-filter ${selectedBrand === "huawei" ? "active" : "inactive"}`}>Huawei</button>
                    </div>
                    <div className="filter">
                        <button onClick={() => handleClearFilter()}>Clear the filter</button>
                    </div>
                </div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="catalog_box d-flex">
                        {productsToDisplay.map((product) => (
                            <div key={product.id} href={product.href} className="catalog_card">
                                <div className="catalog_card_img">
                                    <img src={product.img} alt={product.name}/>
                                </div>
                                <div className="catalog_card_text">
                                    <h3>{product.name}</h3>
                                    <p>$ {product.price}</p>
                                    <button className="">
                                        <Link to={`/product/${product.id}`}>More info</Link>
                                    </button>
                                    <button onClick={() => handleWishesChange(product)}><BsSuitHeart/></button>
                                    <button className="" onClick={() => handleCartChange(product)}>
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="pagination">
                    <button onClick={goToPreviousPage}>Previous</button>
                    {Array.from(
                        {length: Math.ceil(filteredProducts.length / itemsPerPage)},
                        (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => {
                                    handlePageChange(index + 1);
                                    scrollToTop()
                                }}
                                className={currentPage === index + 1 ? "active" : ""}
                            >
                                {index + 1}
                            </button>
                        )
                    )}
                    <button onClick={goToNextPage}>Next</button>
                </div>
            </div>
            {successWish && <SuccessWish name={currentWishProduct.name} handleSuccessWishClose={handleSuccessWishClose} isOpen={isModalOpen}/>}
            {existedWish && <ExistedWish name={currentWishProduct.name} handleExistedWishClose={handleExistedWishClose} isOpen={isModalOpen}/>}
            {registerForWish && <SignForWish name={currentWishProduct.name} handleRegisterForWishClose={handleRegisterForWishClose} isOpen={isModalOpen}/>}
        </section>
    );
};

export default Catalog;
