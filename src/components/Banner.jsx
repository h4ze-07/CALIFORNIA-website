import banner from '../images/banner.png';
import '../scss/banner.scss'
import {Autoplay} from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss/autoplay';
import 'swiper/scss';

const Banner = () => {

    return(
        <section className="banner">
            <div className="container">
                <Swiper
                    modules={[Autoplay]}
                    autoplay={{ delay: 3000 }}
                    loop={true}>
                    <SwiperSlide>
                        <div className="banner_box d-flex">
                            <div className="banner_text">
                                <h1>The new phones are here take a look.</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque in est dui, aliquam,
                                    tempor.
                                    Faucibus morbi turpis.</p>
                                <a href="#">Explore</a>
                            </div>
                            <div className="banner_img">
                                <img src={banner} alt="banner"/>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="banner_box d-flex">
                            <div className="banner_text">
                                <h1>The new phones are here take a look.</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque in est dui, aliquam,
                                    tempor.
                                    Faucibus morbi turpis.</p>
                                <a href="#">Explore</a>
                            </div>
                            <div className="banner_img">
                                <img src={banner} alt="banner"/>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="banner_box d-flex">
                            <div className="banner_text">
                                <h1>The new phones are here take a look.</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque in est dui, aliquam,
                                    tempor.
                                    Faucibus morbi turpis.</p>
                                <a href="#">Explore</a>
                            </div>
                            <div className="banner_img">
                                <img src={banner} alt="banner"/>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>

    )


}

export default Banner;
