import { useLocation } from 'react-router-dom';
import Products from '../CommonComponents/Products';
const ProductsByCategory = () => {
  let {state} = useLocation();
  return (
 <Products category={state?.category} />
  )
}

export default ProductsByCategory












