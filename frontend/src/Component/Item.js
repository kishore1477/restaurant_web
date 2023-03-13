import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import Offcanva from './Offcanva';

const Item = (props) => {
  const {addToCart, cart, removeFromCart, clearCart} = props
  console.log("cart in item", cart)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = ( data) => {
    console.log("handleshow", data )
    const {id, title, price} = data
    console.log("id, title, qty, price", id, title,  price)
    setShow(true)
    addToCart( id, title, 1, price)
  } 
    const {itemId}= useParams()
    console.log("item id ", itemId)
    // string to int 
    const itemSlugId = parseInt(itemId)
    console.log("id", typeof(itemSlugId))

  // Fetched data from api request
  const [dataP, setdataP] = useState([]);

 
const fData = async()=>{

    const data = await fetch('https://tan-defiant-horse.cyclic.app/api/products/getProductRouterItem')
    const datajson = await data.json()
    const Data = datajson.data
  

    for (let i = 0; i < Data.length; i++) {
            const element = Data[i];
           
           const id = parseInt(element._id)
           
           if( element._id=== itemId){
              console.log("condition", element._id === itemSlugId)
              console.log("element is ",element )
                setdataP(element)
        
           
        }
        }
  }
  // Run async function
useEffect(() => {
  fData().then(()=>console.log())
  console.log("dataP",dataP)
}, []);
 
  return (

<div className='container'>
{dataP && <>  
<section className="text-gray-600 body-font overflow-hidden" style={{userSelect: 'auto'}}>
  <div className="container px-5 py-24 mx-auto" style={{userSelect: 'auto'}}>
    <div className="lg:w-4/5 mx-auto flex flex-wrap" style={{userSelect: 'auto'}}>
      <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 rounded" src={dataP.img_url} style={{userSelect: 'auto'}} />
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0" style={{userSelect: 'auto'}}>
        <h2 className="text-sm title-font text-gray-500 tracking-widest" style={{userSelect: 'auto'}}>{dataP.category}</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1" style={{userSelect: 'auto'}}>{dataP.title}</h1>
        <div className="flex mb-4" style={{userSelect: 'auto'}}>
          <span className="flex items-center" style={{userSelect: 'auto'}}>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24" style={{userSelect: 'auto'}}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" style={{userSelect: 'auto'}} />
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24" style={{userSelect: 'auto'}}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" style={{userSelect: 'auto'}} />
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24" style={{userSelect: 'auto'}}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" style={{userSelect: 'auto'}} />
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24" style={{userSelect: 'auto'}}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" style={{userSelect: 'auto'}} />
            </svg>
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24" style={{userSelect: 'auto'}}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" style={{userSelect: 'auto'}} />
            </svg>
            <span className="text-gray-600 ml-3" style={{userSelect: 'auto'}}>4 Reviews</span>
          </span>
          <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s" style={{userSelect: 'auto'}}>
            <a className="text-gray-500" style={{userSelect: 'auto'}}>
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24" style={{userSelect: 'auto'}}>
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" style={{userSelect: 'auto'}} />
              </svg>
            </a>
            <a className="text-gray-500" style={{userSelect: 'auto'}}>
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24" style={{userSelect: 'auto'}}>
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" style={{userSelect: 'auto'}} />
              </svg>
            </a>
            <a className="text-gray-500" style={{userSelect: 'auto'}}>
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24" style={{userSelect: 'auto'}}>
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" style={{userSelect: 'auto'}} />
              </svg>
            </a>
          </span>
        </div>
        <p className="leading-relaxed" style={{userSelect: 'auto'}}>{dataP.desc}</p>
        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5" style={{userSelect: 'auto'}}>
          <div className="flex" style={{userSelect: 'auto'}}>
            <span className="mr-3" style={{userSelect: 'auto'}}>Color</span>
            <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none" style={{userSelect: 'auto'}} />
            <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none" style={{userSelect: 'auto'}} />
            <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none" style={{userSelect: 'auto'}} />
          </div>
          <div className="flex ml-6 items-center" style={{userSelect: 'auto'}}>
            <span className="mr-3" style={{userSelect: 'auto'}}>Size</span>
            <div className="relative" style={{userSelect: 'auto'}}>
              <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10" style={{userSelect: 'auto'}}>
                <option style={{userSelect: 'auto'}}>SM</option>
                <option style={{userSelect: 'auto'}}>M</option>
                <option style={{userSelect: 'auto'}}>L</option>
                <option style={{userSelect: 'auto'}}>XL</option>
              </select>
              <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center" style={{userSelect: 'auto'}}>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4" viewBox="0 0 24 24" style={{userSelect: 'auto'}}>
                  <path d="M6 9l6 6 6-6" style={{userSelect: 'auto'}} />
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="flex" style={{userSelect: 'auto'}}>
          <span className="title-font font-medium text-2xl text-gray-900" style={{userSelect: 'auto'}}>${dataP.price}</span>
          <Link  to ={`/checkout/${dataP._id}`} className ="text-decoration-none text-dark">

          <button className="flex ml-auto text-white  bg-red-500 border-0 py-2 px-6 mx-2 focus:outline-none hover:bg-indigo-600 rounded" style={{userSelect: 'auto'}}>Buy Now</button>
          </Link>
          <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 mx-0 focus:outline-none hover:bg-indigo-600 rounded" style={{userSelect: 'auto'}}
           onClick ={() =>handleShow({id:dataP._id,title:dataP.title, price:dataP.price}) } >Add to Cart  </button>
        <Offcanva addToCart={addToCart} cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} show ={show} handleClose ={handleClose} price ={dataP.price} title ={dataP.title}/>
        </div>
      </div>
    </div>
  </div>
</section>
</>} 
    </div>
   
  )
}

export default Item