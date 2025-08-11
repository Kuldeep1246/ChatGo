import React from 'react'
import Sidebar from '../components/Sidebar'
import Message from '../components/Message'
import useGetMessages from '../hooks/useGetMessages'

function Home() {
  useGetMessages()
  return (
    <div className='flex w-full h-[100vh]'>
    <Sidebar/>
    <Message/>
    </div>
  )
}

export default Home