import React from 'react'
import Logo from './Logo'
import { IoSearch } from "react-icons/io5";
import { LuUserPlus } from "react-icons/lu";
import { TbShoppingCartPlus } from "react-icons/tb";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='h-16 shadow-md bg-slate-100'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div className=''>
          <Link to={"/"}>
            <Logo w={300} h={150}/>
          </Link>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full  focus-within:shadow-md'>
          <input type='text' placeholder='search product here...' className='w-full outline-none pl-2'/>
          <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full '>
          <IoSearch />
          </div>
        </div>
        
        <div className='flex items-center gap-4'>
          <div className='text-3xl cursor-pointer'>
            <LuUserPlus />
          </div>

          <div className='text-2xl relative cursor-pointer hover:bg-red-300 gap-5'>
            <span ><TbShoppingCartPlus/></span>
            <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-4'>
              <p className='text-sm'>0</p>
            </div>
          </div>
        </div>

        <div>
          <Link to={"/login"} className='px-2 py-1 rounded-full text-white text-2xl bg-red-600 hover:bg-red-300'>login</Link>
        </div>
      </div>
    </header>
  )
}

export default Header