import items1 from '../images/items1.jpg'
import items2 from '../images/items2.jpg'
import items3 from '../images/items3.jpg'
import items4 from '../images/items4.jpg'

const productsItem = [
  {
    id: 1,
    title: 'MacBook Pro 13',
    description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet',
    img: items1,
    price: 1200
  },
  {
    id: 2,
    title: 'Smart Galaxy Watch 3',
    description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet',
    img: items2,
    price: 199
  },
  {
    id: 3,
    title: 'MacBook Air M1',
    description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet',
    img: items3,
    price: 1009
  },
  {
    id: 4,
    title: 'iPad',
    description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet',
    img: items4,
    price: 610
  }
]

const formattedProductsItem = productsItem.map((product) => {
  const formattedPrice = product.price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return {
    ...product,
    formattedPrice,
  };
});

const Products = () => {
  return (
    <section className='items'>
      <div className='container'>
        <div className='items_text text_centre'>
        <h3>Save on our most selled items.</h3>
        <p>Our new Limited Edition Winter Design BESPOKE 4-Door Flex™</p>
        </div>
        <div className='items_box d-flex between'>
          <dir className='box d-flex between'>
            {formattedProductsItem.map((product, id)=>(
              <article key={id}>
                <img src={product.img} alt="" />
                <a href="#">{product.title}</a>
                <p>{product.description}</p>
                <h4>{product.formattedPrice}</h4>
              </article>
            ))}
          </dir>
        </div>
      </div>
    </section>
  )
}



export default Products