import { HeroSection } from '@/components/Home/hero-section'
import React from 'react'

const Landing = () => {
  const handleSearch =()=>{

  }
  return (
    <div>
      <HeroSection onSearch={handleSearch}/>
    </div>
  )
}

export default Landing
