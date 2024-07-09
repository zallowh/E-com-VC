import React from 'react'
import { useSelector } from 'react-redux';
import { LuUserPlus } from "react-icons/lu";

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user);

    return (
        <div className='min-h-[calc(100vh-100px)] flex'>
            <aside className='bg-red-600 min-h-full shadow-md w-full max-w-60'>
                <div className='h-fit flex justify-center items-center flex-col'>
                    <div className='text-6xl cursor-pointer'>
                        {
                            user ? (
                                user.profilePic ? (
                                    <img src={user.profilePic} className='w-20 h-20 rounded-full' alt='user profilepic' />
                                ) : (
                                    <div className='w-20 h-20 rounded-full bg-gray-400 flex items-center justify-center text-white'>
                                        {user.username?.[0]?.toUpperCase()}
                                    </div>
                                )
                            ) : (
                                <LuUserPlus />
                            )
                        }
                    </div>
                    <p className='text-center text-lg capitalize font-sans font-semibold'>
                        {user ? user.username : "login to use admin portal"}
                    </p>
                    <hr className='w-full my-4 border-t border-gray-300'/>
                </div>
            </aside>

            <main>

            </main>
        </div>
    )
}

export default AdminPanel
