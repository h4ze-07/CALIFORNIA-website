import Banner from "../components/Banner.jsx";
import Products from '../components/Products'
import BestSection from '../components/BestSection'
import Ideas from '../components/Ideas'
import Else from '../components/Else'


const Home = () => {
  return (
    <>
        <Banner/>
        <Products />
        <BestSection />
        <Ideas />
        <Else />
    </>
  )
}

export default Home