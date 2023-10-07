import { useLoaderData, useParams, Link } from "react-router-dom"

const OneProductItem = () => {
    const params = useParams();
    const loaderData = useLoaderData();
    console.log(loaderData)
  return (
    <div>OneProductItem</div>
  )
}

export default OneProductItem