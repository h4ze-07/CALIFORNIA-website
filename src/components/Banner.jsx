import banner from '../images/banner.png';
import bannerLaptop from '../images/banner_laptop.png';
import bannerTablet from '../images/banner_tablet.png';
import bannerWatch from '../images/banner_watch.png';
import '../scss/banner.scss'
import {NavLink} from 'react-router-dom';
import {Autoplay} from "swiper/modules";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/scss/autoplay';
import 'swiper/scss';

const Banner = () => {

    return (
        <section className="banner">
            <div className="container">
                <Swiper
                    modules={[Autoplay]}
                    autoplay={{delay: 4000}}
                    loop={true}>
                    <SwiperSlide>
                        <div className="banner_box d-flex">
                            <div className="banner_text">
                                <h1>The new phones are here take a look.</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque in est dui,
                                    aliquam,
                                    tempor.
                                    Faucibus morbi turpis.</p>
                                <NavLink className='banner_link' to='/catalog'>
                                    <a href="#">Explore</a>
                                </NavLink>
                            </div>
                            <div className="banner_img">
                                <img src={banner} alt="banner"/>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="banner_box d-flex">
                            <div className="banner_text">
                                <h1>The new laptops are here take a look.</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque in est dui,
                                    aliquam,
                                    tempor.
                                    Faucibus morbi turpis.</p>
                                <NavLink className='banner_link' to='/catalog'>
                                    <a href="#">Explore</a>
                                </NavLink>
                            </div>
                            <div className="banner_img">
                                <img className='img_laptop' src={bannerLaptop} alt="banner"/>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="banner_box d-flex">
                            <div className="banner_text">
                                <h1>The new tablets are here take a look.</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque in est dui,
                                    aliquam,
                                    tempor.
                                    Faucibus morbi turpis.</p>
                                <NavLink className='banner_link' to='/catalog'>
                                    <a href="#">Explore</a>
                                </NavLink>
                            </div>
                            <div className="banner_img">
                                <img className='img_tablet' src={bannerTablet} alt="banner"/>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="banner_box d-flex">
                            <div className="banner_text">
                                <h1>The new watch are here take a look.</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque in est dui,
                                    aliquam,
                                    tempor.
                                    Faucibus morbi turpis.</p>
                                <NavLink className='banner_link' to='/catalog'>
                                    <a href="#">Explore</a>
                                </NavLink>
                            </div>
                            <div className="banner_img">
                                <img className='img_watch' src={bannerWatch} alt="banner"/>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>

    )


}

export default Banner;
