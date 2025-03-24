import React from 'react'

const index = ({type,labal,labalClassName,InputClassName,className}) => {
  return (
    <div className={` ${className}`}>
    <label  className={labalClassName}  htmlFor="">{labal}</label>
   <input  className={InputClassName}  type={type} />
   </div>
  )
}

export default index
