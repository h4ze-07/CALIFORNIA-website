import IdeasImg from '../images/ideas.jpg'

const Ideas = () => {
  return (
    <section className="ideas">
        <div className="container text_centre">
            <h3>Ideas have a place here</h3>
            <p>Our new Limited Edition Winter Design BESPOKE 4-Door Flex™</p>
            <div className="ideas_box d-flex">
                <div className="box_img">
                    <img src={IdeasImg} alt='ideas' />
                </div>
                <div className="box_text">
                    <p>We Make It Easy To Find The Great Design Talent, Easier...</p>
                    <p>Road Design Handbook For The International Road...</p>
                    <p>The Best Kept Secrets About Creative People</p>
                    <p>We Make It Easy To Find The Great Design Talent, Easier...</p>
                </div>
            </div>

            <a href="#">See all</a>
        </div>
    </section>
  )
}

export default Ideas