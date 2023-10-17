import laptop from '../images/shop_laptop.png';
import watch from '../images/shop_watch.png';
import phones from '../images/shop_phons.png';
import tablet from '../images/shop_tablet.png';
import '../scss/shop_section.scss'
import {Link} from "react-router-dom";

const ShopSection = () => {
    return (
        <section id="product" className="shop">
            <div className="container">
                <div className="shop_text text_centre">
                    <h3>Shop our latest offers and categories</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque in est dui, aliquam, tempor.
                        Faucibus
                        morbi turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
            </div>
            <div className="container d-flex between">
                <div className="shop_box">
                    <div className="box1">
                        <div className="laptop_img">
                            <img src={laptop} alt="laptop"/>
                        </div>
                        <div className="box_text">
                            <Link to="/catalog/laptop">Laptops</Link>
                            <h4>True Laptop<br></br>Solution</h4>
                        </div>
                    </div>
                    <div className="box1 d-flex">
                        <div className="watch_img">
                            <img src={watch} alt="watch"/>
                        </div>
                        <div className="box_text">
                            <Link to="catalog/watch">Watch</Link>
                            <h4>Not just stylisht</h4>
                        </div>
                    </div>
                </div>
                <div className="shop_box d-flex">
                    <div className="box2">
                        <div className="phones_img">
                            <img src={phones} alt="phons"/>
                        </div>
                        <div className="box_text text_centre">
                            <Link to="catalog/smartphones">Phones</Link>
                            <h4>Your day to day<br></br>life</h4>
                        </div>
                    </div>
                    <div className="box2">
                        <div className="box_text text_centre">
                            <Link to="catalog/tablet">Tablet</Link>
                            <h4>Empower your<br></br>work</h4>
                        </div>
                        <div className="tablet_img">
                            <img src={tablet} alt="tablet"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ShopSection