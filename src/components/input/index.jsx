import React from 'react'

const index = ({  onChange,placeholder,type,label,labalClassName,InputClassName,className,htmltype}) => {
  return (
    <div className={`  ${className}`}>
    <label  className={`block text-[16px] py-1 font-[400] text-gray-700 mb-1${labalClassName}`}  htmlFor={htmltype}>{label}</label>
   <input  onChange={onChange} placeholder={placeholder} className={`  mb-1 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 block w-full sm:text-sm border-gray-300 rounded-md px-3 text-gray-500 bg-transparent py-3   border ${InputClassName}`}  type={type} />
   </div>
  )
}

export default index
