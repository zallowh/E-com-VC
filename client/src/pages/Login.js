import React, { useState } from 'react';
import { TbEyeCheck, TbEyeCancel } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import context from '../context/index';
import { useContext } from 'react';


const Login = () => {
    const [showPassword, setShowPassword] = useState(true);
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const navigate = useNavigate()
    const { fetchUserDetails } = useContext(context)
    console.log("generalContext",fetchUserDetails)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataResponse = await fetch("http://localhost:8080/api/login", {
                method: "POST",
                credentials : 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const dataApi = await dataResponse.json();
            if (dataApi.success) {
                toast.success(dataApi.message);
                navigate("/")
                fetchUserDetails()
            } else {
                toast.error(dataApi.message);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <section id='login'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-2 py-5 w-full max-w-sm mx-auto relative'>
                    <div className='absolute inset-x-0 top-0 bg-red-600 text-white py-4 text-center'>
                        <h1 className='font-sans font-semibold'>WELCOME BACK! PLEASE LOGIN</h1>
                    </div>
                    <div className='pt-14'>
                        <form onSubmit={handleSubmit}>
                            <div className='grid'>
                                <label className='font-sans font-semibold'>Email:</label>
                                <div className='bg-slate-100 p-2'>
                                    <input
                                        type='email'
                                        placeholder='Type your email here'
                                        name='email'
                                        value={data.email}
                                        onChange={handleOnChange}
                                        required
                                        className='w-full h-full outline-none bg-transparent'
                                    />
                                </div>
                            </div>
                            <div className='grid my-4'>
                                <label className='font-sans font-semibold'>Password:</label>
                                <div className='bg-slate-100 p-2 flex'>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder='Type your password here'
                                        name='password'
                                        value={data.password}
                                        onChange={handleOnChange}
                                        required
                                        className='w-full h-full outline-none bg-transparent'
                                    />
                                    <div className='text-2xl cursor-pointer' onClick={() => setShowPassword((prev) => !prev)}>
                                        {showPassword ? <TbEyeCancel /> : <TbEyeCheck />}
                                    </div>
                                </div>
                                <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:bg-red-300'>
                                    Forgot password?
                                </Link>
                            </div>
                            <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>
                                Login
                            </button>
                        </form>
                        <p>Don't have an account?</p>
                        <Link to={'/sign-up'} className='block my-5 hover:underline'>
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
