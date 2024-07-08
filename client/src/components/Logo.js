import React from 'react'
import logohead from '../assets/tittlelogo.png';

const Logo = ({w,h}) => {
  return (
    <div>
        <img src={logohead} alt="login icons" height={h} width={w} />
    </div>
  )
}

export default Logo