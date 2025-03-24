import React from 'react'

const index = ({className,buttonName,onClick}) => {
  return (
 <button onClick={onClick} className={className}>
{buttonName}
 </button>
  )
}

export default index
