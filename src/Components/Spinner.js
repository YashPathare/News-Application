import React from 'react'
import spinner from './Spinner@1x-1.0s-200px-200px.gif'
const Spinner = () => {
  return (
    <div className='text-center'> 
      <img src={spinner} alt='spinner'/>
    </div>
  ) 
}
export default Spinner