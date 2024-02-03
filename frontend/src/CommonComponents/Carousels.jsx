import React from 'react'
import Card from 'react-bootstrap/Card';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
const Carousels = ({data,category}) => {
    const   responsive={
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024
          },
          items: 3,
          partialVisibilityGutter: 40
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0
          },
          items: 1,
          partialVisibilityGutter: 30
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464
          },
          items: 2,
          partialVisibilityGutter: 30
        }
      }
  return (
    <Carousel responsive={responsive}>
    {data?.filter((element)=>(element.category === category))?.map((item,i)=>{

        return <Card style={{ width: '18rem' }} className = "m-3">
        <Link to ={'/itemDetails'}   state={{ itemId: item?._id }} className ="text-decoration-none text-dark">
       
  <Card.Img style={{ width: '100%', height: '200px' }}  variant="top" src={item.img_url} />

   
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text>
          {item.desc.length>200?`${item.desc.substring(0,200)}...`:item.desc}
          </Card.Text>
          <Card.Text>
           <b>$ {item.price}</b>
          </Card.Text>
       
        </Card.Body>
          </Link>
      </Card>
  
    })}
</Carousel>
  )
}

export default Carousels