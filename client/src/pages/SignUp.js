import React, { useState } from 'react';
import loginIcons from '../assets/signin.gif';
import { TbEyeCheck, TbEyeCancel } from "react-icons/tb";
import imageToBase64 from '../helpers/imageToBase64';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [thePassword, setThePassword] = useState(true);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
    profilePic: ""
  });

  const navigate = useNavigate();

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageToBase64(file);

    setData((prev) => ({
      ...prev,
      profilePic: imagePic
    }));
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirm) {
      try {
        const dataResponse = await fetch("http://localhost:8080/api/signup", {
          method: "post",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(data)
        });

        const dataApi = await dataResponse.json();

        if (dataApi.success) {
          toast.success(dataApi.message);
          navigate("/login");
        } else {
          toast.error(dataApi.message);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred. Please try again.");
      }
    } else {
      toast.error("Your password did not match the confirm-password.");
    }
  };

  return (
    <section id='sign-up'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-2 py-5 w-full max-w-sm mx-auto'>
          <div className='w-20 h-20 mx-auto'>
            <div>
              <img src={data.profilePic || loginIcons} alt="login icons"  />
            </div>

            <form>
              <label>
                <div className='text-xs bg-slate-200 cursor-pointer' title='size limit 10MB'>
                  upload photo
                </div>
                <input type='file' className='hidden' onChange={handleUpload} />
              </label>
            </form>
          </div>

          <form className='pt-6' onSubmit={handleSubmit}>
            <div className='grid'>
              <label>Username:</label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='text'
                  placeholder='type your username here'
                  name='username'
                  value={data.username}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>

              <label>Email:</label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='email'
                  placeholder='type your email here'
                  name='email'
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>

            <div className='grid'>
              <label>Password:</label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  type={thePassword ? "password" : "text"}
                  placeholder='type your password here'
                  name='password'
                  value={data.password}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
                <div className='text-2xl cursor-pointer' onClick={() => setThePassword((prev) => !prev)}>
                  {thePassword ? <TbEyeCancel /> : <TbEyeCheck />}
                </div>
              </div>

              <label>Confirm-Password:</label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  type={thePassword ? "password" : "text"}
                  placeholder='type to confirm password'
                  name='confirm'
                  value={data.confirm}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
                <div className='text-2xl cursor-pointer' onClick={() => setThePassword((prev) => !prev)}>
                  {thePassword ? <TbEyeCancel /> : <TbEyeCheck />}
                </div>
              </div>
            </div>
            <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>
              SignUp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
