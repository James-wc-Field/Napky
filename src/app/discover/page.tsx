'use client'
import React from 'react'
// import { Button } from '@aws-amplify/ui-react';
// import '@aws-amplify/ui-react/styles.css';
import DiscoverCard from '../components/DiscoverCard'
import LoginCard from './loginUI/LoginCard'
export default function Page() {
  const list = [0,1,2,3,4,5,6,7,8,9,10]
  return (
    <>
      {/* <Button variation="primary">Hello world</Button>; */}
      <LoginCard></LoginCard>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {list.map((item, index) => {
        return DiscoverCard(String(index))
      })}
      </div>
    </>
  )
  }