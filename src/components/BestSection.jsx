import '../scss/BestSection.scss'
import best1 from '../images/best1.png';
import best2 from '../images/best2.png';
import best3 from '../images/best3.png';




const bestsectionItems = [
    {
        id: 1,
        title: 'Latest and gratest',
        img: best1
    },
    {
        id: 2,
        title: 'Best selling',
        img: best2
    },
    {
        id: 3,
        title: 'Every product',
        img: best3
    }
]

const BestSection = () => {
  return (
    <section className='best'>
        <div className='container'>
            <div className='best_text text_centre'>
            <h3>See the best around here</h3>
            <p>Our new Limited Edition Winter Design BESPOKE 4-Door Flex™</p>
            </div>
            <div className='best_box d-flex between'>
                {bestsectionItems.map((item, id) => (
                  <div key={id} className='box text_centre'>
                    <p>Smart light bulb pack</p>
                    <h4>{item.title}</h4>
                    <a href="#">Explore</a>
                    <div className="box_img">
                    <img src={item.img} alt="img" />
                </div>
                </div>   
                ))}
               
            </div>
        </div>
    </section>
  )
}

export default BestSection

