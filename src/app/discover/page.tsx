'use client'
import React from 'react'
import DiscoverCard from '../components/DiscoverCard'

export default function Page() {
  const list = [
    {"username": "MasterBowtie", "project": "Pathfinder1", "modified": "01/12/2024", "created": "02/27/2022", "rating":4.2, "image": "https://i1.wp.com/nerdsonearth.com/wp-content/uploads/2020/06/20190624-42.jpg?fit=1200%2C776&ssl=1", "image_text": "This is an image"}, 
    {"username": "MasterBowtie", "project": "Pathfinder2", "modified": "01/12/2024", "created": "02/27/2022", "rating":4.2, "image": "https://i1.wp.com/nerdsonearth.com/wp-content/uploads/2020/06/20190624-42.jpg?fit=1200%2C776&ssl=1", "image_text": "This is an image"},
    {"username": "MasterBowtie", "project": "Pathfinder3", "modified": "01/12/2024", "created": "02/27/2022", "rating":4.2, "image": "https://i1.wp.com/nerdsonearth.com/wp-content/uploads/2020/06/20190624-42.jpg?fit=1200%2C776&ssl=1", "image_text": "This is an image"},
    {"username": "MasterBowtie", "project": "Pathfinder4", "modified": "01/12/2024", "created": "02/27/2022", "rating":4.2, "image": "https://i1.wp.com/nerdsonearth.com/wp-content/uploads/2020/06/20190624-42.jpg?fit=1200%2C776&ssl=1", "image_text": "This is an image"}
  ]

  return (
  
  <div className="inline overflow-hidden">
  {list.map((item, index) => {
    return DiscoverCard(item)
  })}
  </div>
  )
  }