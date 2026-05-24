import {useParams}
from "react-router-dom"

import {pets}
from "../data/pets"

import Navbar
from "../components/Navbar"

import Footer
from "../components/Footer"

export default function ProductDetail(){

const {id}=useParams()

const pet=

pets.find(

x=>x.id===Number(id)

)

if(!pet){

return <h1>Not Found</h1>

}

const rarityColor={

Legendary:"#F59E0B",

Epic:"#C026D3",

Rare:"#2563EB",

Uncommon:"#16A34A"

}

return(

<>

<Navbar/>

<div className="detailWrapper">

<button

className="back"

onClick={()=>

history.back()

}

>

← Back to Products

</button>

<div

className="topBar"

style={

{

background:

rarityColor[pet.rarity]

}

}

>

</div>

<div className="detailCard">

<div className="priceBox">

{pet.price}

</div>

<div

className="rarityBox"

style={{

background:

rarityColor[pet.rarity]

}}

>

{pet.rarity}

</div>

<img

src={pet.image}

className="detail-image"

/>

<h1>

{pet.name}

</h1>

<p>

{pet.description}

</p>

<div className="rating">

⭐⭐⭐⭐⭐

{pet.rating}

(3 reviews)

</div>

<button

className="buy"

onClick={()=>{

window.open(

`https://wa.me/6288232273896?text=Halo Joyz'S saya ingin membeli ${pet.name}`,

"_blank"

)

}}

>

Buy Now

</button>

<button

className="community"

onClick={()=>{

window.open(

"https://whatsapp.com/channel/0029Vb6dDMH47Xe34NDKHW11",

"_blank"

)

}}

>

Join The Community

</button>

</div>

</div>

<Footer/>

</>

)

}