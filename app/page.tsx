import Card from '@/components/Card'
import Hero from '@/components/Hero'
import Offer from '@/components/Offer'
import ProductCard from '@/components/ProductCard'
import React from 'react'
import {data, product} from "@/lib/data"
import { features } from '@/lib/featuresData'
import Features from '@/components/Features'
import FeatureDetails from '@/components/FeatureDetails'
import { HeadingDetails } from '@/lib/data'
import { featureDetails } from '@/lib/data'
import EmailDetails from '@/components/EmailDetails'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Tagline from '@/components/Tagline'

const page = () => {
  return (
    <>

      <Hero image='/iphone.jpg' title='Welcome to Tech Haven' desc='Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna.' btn='Shop Now'/>
     
    <section className='mx-20'>

    <div className="flex flex-col md:flex-row gap-10 mb-30">
        {data.map((d,id) => (
          <Card key={id} image={d.image}  title= {d.title} desc={d.desc} />
        ))}
      </div >
     
        <Tagline title="Our Products" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magn."/>
    
     
      <div className="grid grid-cols-1 md:grid-cols-3 mb-30">
        {product.map((p, id) => (
          <ProductCard  key={id} id={p.id} image={p.image} purpose={p.purpose} title= {p.title} discount_price={p.discount_price} original_price={p.original_price}/>
        ))}
      </div>
      <Offer/>
      
      <Tagline title="Our Products" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magn."/>
      <div className="grid grid-cols-1 md:grid-cols-3 mb-30 ">
        {features.map((f, id) => (
          <Features key={id} id={f.id} icon={f.icon} title={f.title} description={f.description}/>
        ))}
      </div>

     
      <Tagline title="Read With US" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magn."/>
      <div  className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-30">
        {featureDetails.map((fd, id) => (
          <FeatureDetails key={id} id={fd.id} image={fd.image} title={fd.title} description={fd.description} date={fd.date}/>
        ))}

      </div>

      <EmailDetails/>
    
    </section>

    </>
    
     
  )
}

export default page
