import React from 'react'
import mystyle from './loader.module.css'

function Loader() {
  return (
    <div className={mystyle.load}>
<span className={mystyle.loader}></span>
    </div>
  )
}

export default Loader