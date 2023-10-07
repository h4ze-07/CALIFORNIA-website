import Banner from "../components/Banner.jsx";
import Products from '../components/Products'
import BestSection from '../components/BestSection'
import Ideas from '../components/Ideas'
import Else from '../components/Else'
import ShopSection from "../components/ShopSection.jsx";

const Home = ({allProducts}) => {
  return (
    <>
        <Banner/>
        <ShopSection/>
        <Products swiperProducts={allProducts}/>
        <BestSection />
        <Ideas />
        <Else />
    </>
  )
}

export default Home