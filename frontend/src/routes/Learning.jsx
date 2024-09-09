import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import banner1 from '../assets/Banner1.jpeg'
import banner3 from '../assets/Banner2.webp'
import banner2 from '../assets/Banner3.webp'

const Learning = () => {
  return (
    <div>

<Carousel className='mt-[7vh]'>
      <Carousel.Item  className='bg-[#0f151a] w-[1000px] h-[200px] relative sm:h-[300px] md:h-[400px]'>
      
        <img src={banner1} className=' h-full w-[60%] mx-auto '/>
      </Carousel.Item>
      <Carousel.Item className=' w-[1000px] h-[200px] bg-[#080d12] sm:h-[300px] md:h-[400px]'>
        <img src={banner2} className='h-full w-[60%] mx-auto'/>
      </Carousel.Item>
      
      <Carousel.Item className=' w-[1000px] h-[200px] bg-[#0a0d0c] sm:h-[300px] md:h-[400px]'>

      <div className='w-full h-full flex items-center justify-center'>
      <img src={banner3} className=' w-[50%] h-full mb-8 '/>
      <div>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </div>

      </div>

        
      </Carousel.Item>
    </Carousel>

    </div>
  )
}

export default Learning