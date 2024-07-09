import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import context from './context/index';
import { setUserDetails } from './store/userSlice';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch()

  const fetchUserDetails = async()=>{
    const dataResponse = await fetch("http://localhost:8080/api/user-details",{
      method : "get",
      credentials : 'include'
    })
    const dataApi = await dataResponse.json()
    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
  }

  useEffect(()=>{
/**user details */
    fetchUserDetails()
  },[])

  return (
    <>
    <context.Provider value={{
      fetchUserDetails //user details
    }}>
    <ToastContainer />
      <Header/>
      <main className='min-h-[calc(100vh-100px)]'>
        <Outlet/>
      </main>
      <Footer/>
      </context.Provider>
    </>
  );
}

export default App;
