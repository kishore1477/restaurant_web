import React,{useEffect, useState} from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { useLocation } from 'react-router-dom';


const Pizza = () => {
  const [dataP, setdataP] = useState([]);

  let location = useLocation();
  console.log("pathname",location.pathname)
  const fData = async()=>{

    const data = await fetch('https://tan-defiant-horse.cyclic.app/api/products/getProductRouterItem')
    const datajson = await data.json()
   console.log("datajson", datajson)
const Data =  datajson.data
    setdataP(Data)
    console.log(datajson)
  }
useEffect(() => {
  fData()
}, []);
var Pizzas =[]

for (let i = 0; i < dataP.length; i++) {
  const element = dataP[i];
 
  if(element.category=== "pizza"){
      Pizzas.push(element)
  } 

}

  return (
   <Container>
    <h1 className="mt-4 text-center text-pink-900">Pizzas  </h1>
   <section className="text-gray-600 body-font" style={{userSelect: 'auto'}}>
    <div className="container px-5 py-24 mx-auto" style={{userSelect: 'auto'}}>
      <div className="flex flex-wrap -m-4" style={{userSelect: 'auto'}}>
      
      
      {Pizzas ? Pizzas.map((item,i)=>{
    return   <div className="p-4 md:w-1/3" style={{userSelect: 'auto'}}>
               <Link to ={`/item/${item._id}`} className ="text-decoration-none text-dark">

          <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden" style={{userSelect: 'auto'}}>
            <img className="lg:h-48 md:h-36 w-full object-center" src={item.img_url} alt={`${item.category} image`} style={{userSelect: 'auto'}} />
            <div className="p-6" style={{userSelect: 'auto'}}>
              <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{userSelect: 'auto'}}>CATEGORY</h2>
              <h1 className="title-font text-lg font-medium text-gray-900 mb-3" style={{userSelect: 'auto'}}>The Catalyzer</h1>
              <p className="leading-relaxed mb-3" style={{userSelect: 'auto'}}>{item.title}</p>
              <div className="flex items-center flex-wrap " style={{userSelect: 'auto'}}>
                <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0" style={{userSelect: 'auto'}}>Learn More
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" style={{userSelect: 'auto'}}>
                    <path d="M5 12h14" style={{userSelect: 'auto'}} />
                    <path d="M12 5l7 7-7 7" style={{userSelect: 'auto'}} />
                  </svg>
                </a>
                <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200" style={{userSelect: 'auto'}}>
                  <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{userSelect: 'auto'}}>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" style={{userSelect: 'auto'}} />
                    <circle cx={12} cy={12} r={3} style={{userSelect: 'auto'}} />
                  </svg>1.2K
                </span>
                <span className="text-gray-400 inline-flex items-center leading-none text-sm" style={{userSelect: 'auto'}}>
                  <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{userSelect: 'auto'}}>
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" style={{userSelect: 'auto'}} />
                  </svg>6
                </span>
              </div>
            </div>
          </div>
          </Link>
        </div>
      })  : <h1 className=' mt-72 flex justify-center items-center'>Loading...</h1>} 
      </div>
    </div>
  </section>
 
  


   </Container>
  )
}

export default Pizza