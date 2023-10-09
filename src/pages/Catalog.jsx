import { Link } from "react-router-dom"


const Catalog = ({products}) => {
  return (
    <section style={{
      marginTop: '100px',
      fontSize: '25px'
    }}>
      <div className="">
        <div className="">
          <h2 className="">Products</h2>

          <div className="">
            {products.map((product) => (
              <a key={product.id} href={product.href} className="">
                <div className="">
                  <img
                    src={product.img}
                    className=""
                  />
                </div>
                <h3 className="">{product.name}</h3>
                <p className="">{product.price}</p>
                <div className="">
                  <button className="">
                    <Link to={`/product/${product.id}`}>More info</Link>
                  </button>
                  <button className="">Add to cart</button>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Catalog