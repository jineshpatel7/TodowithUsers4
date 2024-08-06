import {React,useState} from 'react'
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
// 

// toast.configure();

const Login = ({setAuth}) => {

const [inputs, setInputs] = useState({
  email: "",
  password: ""
})

const {email,password} = inputs;
const onChange = (e) => setInputs({ ...inputs, [e.target.name]: e.target.value });
const onSubmitForm = async (e) => {
    e.preventDefault();

    try{
    const body={email,password}

    const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })

    const parseRes= await response.json();
    console.log(parseRes);

    if (parseRes.jwtToken) {

    localStorage.setItem("token", parseRes.jwtToken);
    setAuth(true);
    toast.success("Login Successful");
    }else{
      setAuth(false);
      toast.error(parseRes)
    }

  }catch(err){
    console.error(err.message);
  }
}

  return (
    <>
    <h1 className='mt-5 text-center'>Login</h1>
    <form action="" className='form' onSubmit={onSubmitForm}>
      <input type="text" 
              name="email" 
              className='form-control my-3 text-center mx-auto w-75'
              placeholder='Email'
              value={email}
              onChange={e=> onChange(e)}
      />
      <input type="password" 
              name="password" 
              className='form-control my-3 text-center mx-auto w-75'
              placeholder='Password'
              value={password}
              onChange={e=> onChange(e)}
      />
    <button className='btn btn-success btn-block mx-auto w-50'>Submit</button>
    </form>
    <Link to="/register" className='btn btn-primary btn-block w-25 my-5' style={{marginLeft:"170px"}}> Register Instead?</Link>
    </>
  )
}

export default Login