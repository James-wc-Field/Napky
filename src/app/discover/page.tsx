'use client'
import React from 'react'
import DiscoverCard from '../components/DiscoverCard'
export default function Page() {
  const list = [0,1,2,3,4,5,6,7,8,9,10]
  return (
  <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
  {list.map((item, index) => {
    return DiscoverCard(String(index))
  })}
  </div>
  )
  }