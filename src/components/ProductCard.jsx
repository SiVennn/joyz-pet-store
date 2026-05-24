import {Link}
from "react-router-dom"

export default function ProductCard({pet}){

return(

<Link

to={`/product/${pet.id}`}

className="link"

>

<div className="card">

<img

src={pet.image}

alt={pet.name}

className="card-image"

/>

<h3>

{pet.name}

</h3>

</div>

</Link>

)

}