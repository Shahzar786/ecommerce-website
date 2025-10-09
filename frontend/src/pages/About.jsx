import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Newsletter from '../components/Newsletter'

const About = () => {
  return (
    <div>

       <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'} />
       </div>

        <div className='my-10 flex flex-col md:flex-row gap-16'>
           <img className='w-full md:max-w-[450px]' src={assets.about_img}  alt="" />
            <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
               <p>Forever was born out of a deep passion for innovation and a strong desire to bring revolution in the fashion industry. It is not just a brand, but a vision to create something truly unique that blends creativity with modern trends. With dedication and forward-thinking ideas, Forever aims to inspire confidence, redefine style, and set new standards, making fashion more accessible, meaningful, and powerful for everyone. </p>
               <p>Since our inception, we have worked tirelessly to create a diverse selection in the clothing market that reflects creativity, quality, and inclusivity. Our vision has always been to design apparel that speaks to different lifestyles, personalities, and cultures. With a commitment to excellence, we continuously adapt to changing trends while staying true to our core values. Every collection we launch is a step towards redefining style, empowering individuals, and making fashion more accessible to all.</p>
               <b className='text-gray-800' >Our Mission</b>
               <p>Our mission at Forever is to revolutionize fashion by blending creativity, innovation, and inclusivity. We strive to design clothing that empowers individuals, celebrates diversity, and sets new style standards while making fashion meaningful, sustainable, and accessible to everyone.</p>
            </div>
        </div>
     
        <div className=' text-4xl py-4'>
            <Title text1={'WHY'} text2={'CHOOSE US'} />
        </div>

     <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className=' md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
           <b>Quality Assurance:</b>
           <p className='text-gray-600'>At Forever, quality assurance is our core commitment. Every product undergoes design, and rigorous testing to ensure durability, comfort, and style. We prioritize excellence at each stage, delivering fashion that meets global standards and customer satisfaction.</p>  
        </div>
       <div className=' md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
           <b>Convenience:</b>
           <p className='text-gray-600'>At Forever, we prioritize convenience by offering seamless shopping experiences, user-friendly platforms, and reliable services. From easy browsing to quick delivery and hassle-free returns, we ensure customers enjoy fashion with comfort, accessibility, and trust at every step.</p>  
        </div>
        <div className=' md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
           <b>Exceptional Customer Service:</b>
           <p className='text-gray-600' >we place customers at the heart of everything we do. Our customer service team is dedicated to providing timely support, personalized guidance, and effective solutions, ensuring every shopping experience remains smooth, satisfying, and truly memorable.</p>  
        </div>
      </div>

        <Newsletter />

    </div>
  )
}

export default About