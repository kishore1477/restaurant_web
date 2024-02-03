import React ,{useState , useEffect}from 'react'
import { Container } from 'react-bootstrap'
import 'react-multi-carousel/lib/styles.css';
import Carousels from '../CommonComponents/Carousels';
import Loader from '../CommonComponents/Loader';
import { getApiData } from '../CommonComponents/ApiFunctions';
import { toast } from 'react-toastify';
const Home = () => {
  // Fetched data from api request
    const [dataP, setdataP] = useState([]);
    const [loader, setLoader] = useState(false);
    // Unique category
    const [unique, setUnique] = useState([]);
  const fetchProducts = async()=>{
    try {
        setLoader(true)
        const res =  await   getApiData('products/getAllProducts')
        if(res?.status === 200){
          setLoader(false)
          const Data  = res?.data?.data
          const arrayUniqueByKey = [...new Set(Data.map(item =>{return item.category}))]
          setUnique(arrayUniqueByKey)
          setdataP(Data)
        }
      } catch (error) {
       
        toast.error(error?.response?.data?.message)
      }
    }
useEffect(() => {
  fetchProducts()
}, []);
  return (
      <Container style={{minHeight:"100vh", display:"flex",flexDirection:"column" }} className='mt-4 text-center'>
        {loader?<Loader/>:<>
<h2 className='text-center'>Our Products</h2>
{unique?.map((catg)=>{
  return <div style={{flex: 1}}>
  <h2 className='m-2'>{catg?.charAt(0).toUpperCase() + catg.slice(1)}</h2>
  <Carousels  data = {dataP} category = {catg} />
  <hr/>
  </div>
})}


</>}
    </Container>
  )
}

export default Home