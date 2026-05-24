import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

import ProductCard
from "../components/ProductCard"

import {pets}
from "../data/pets"

export default function Home(){

return(

<>

<Navbar/>

<div className="grid">

{

pets.map(

pet=>

<ProductCard

key={pet.id}

pet={pet}

/>

)

}

</div>

<Footer/>

</>

)

}