import {useState,useEffect} from 'react'
import { toast } from "react-toastify";
import  InputTodo from "./InputTodo"
import ListTodo from './ListTodo';
const Dashboard = ({setAuth}) => {

  const [name,setName]=useState('');

  const getName = async ()=>{
    try {
        const response=await fetch("http://localhost:5000/dashboard/",{
          method:"GET",
          headers: {token:localStorage.token}

        })

        const parseRes= await response.json();
        // console.log(parseRes);
        setName(parseRes.username)
    } catch (error) {
      console.error(error.message);
      
    }
  }

  useEffect(() =>{
    getName()
  },[])

  const logout=(e)=>{
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
    toast.success("Logged Out successfully")
  }

  return (
    <>
    <h1 className='mt-5 text-center'>Dashboard </h1>
    <h2 className='mt-5 text-center'>Welcome {name}</h2>

    <h2 className='mt-5 text-center'>Your TO DO List</h2>

    <InputTodo />
    <ListTodo/>
    
    <button className='btn btn-success btn-block mx-auto w-25 my-5' onClick={e=>logout(e)}>Logout</button>
    
    </>
  )
}

export default Dashboard;