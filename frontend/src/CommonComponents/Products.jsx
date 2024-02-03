import React,{useEffect, useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap'
import Loader from './Loader';
import { toast } from 'react-toastify';
import { getApiData } from './ApiFunctions';
const Products = ({category}) => {
  const navigate = useNavigate();
    const [dataP, setdataP] = useState([]);
    const [loader, setLoader] = useState(false);
      const getProducts = async()=>{
        try {
          setLoader(true)
        const res = await getApiData(`products/getAllProducts`)
        if(res?.status === 200) {
          setdataP(res?.data?.data)
          setLoader(false)
        }else{
          setLoader(false)
        toast.error(res?.data?.message)
        }
        } catch (error) {
          setLoader(false)
          toast.error(error?.response?.data?.message)
        }
          }
    useEffect(() => {
      getProducts()
    }, []);
  return (
    <>
    {loader?<Loader/>:  <Container>
    <h1 className="mt-4 text-center text-pink-900">{category?.charAt(0).toUpperCase() + category?.slice(1)}  </h1>
   <section className="text-gray-600 body-font" >
    <div className="container px-5 py-24 mx-auto" >
      <div className="flex flex-wrap -m-4" >
      
      
      {  dataP?.filter((element)=>(element.category === category))?.map((item,i)=>{
    return   <div className="p-4 md:w-1/3"  >
               <Link to ={'/itemDetails'}   state={{ itemId: item?._id }} className ="text-decoration-none text-dark">

          <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden" >
            <img className="lg:h-48 md:h-36 w-full object-center" src={item.img_url} alt={`${item.category} image`}  />
            <div className="p-6" >
              <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" >CATEGORY</h2>
              <h1 className="title-font text-lg font-medium text-gray-900 mb-3" >The Catalyzer</h1>
              <p className="leading-relaxed mb-3" >{item.title}</p>
              <div className="flex items-center flex-wrap " >
                <a className="inline-flex items-center md:mb-2 lg:mb-0 text-decoration-none text-dark" >Learn More
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" >
                    <path d="M5 12h14"  />
                    <path d="M12 5l7 7-7 7"  />
                  </svg>
                </a>
                <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200" >
                  <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"  />
                    <circle cx={12} cy={12} r={3}  />
                  </svg>1.2K
                </span>
                <span className="text-gray-400 inline-flex items-center leading-none text-sm" >
                  <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"  />
                  </svg>6
                </span>
              </div>
            </div>
          </div>
          </Link>
        </div>
      })  } 
      </div>
    </div>
  </section>

   </Container>}
    </>
  
  )
}

export default Products