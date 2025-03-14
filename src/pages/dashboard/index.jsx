import React from 'react'
import Header from '../../components/header'
import SideBar from '../../components/sideBar'
const index = () => {
  return (
    <div>
      <Header/>
      <div className="w-full max-w-[1300px] px-4 sm:px-5 flex flex-col">
        <div className='w-[30%]'>
            <SideBar/>
        </div>
        <div className='w-[30%]'></div>
      </div>
    </div>
  )
}

export default index
