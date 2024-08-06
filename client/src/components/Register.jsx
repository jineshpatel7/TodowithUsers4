import {  useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = ({setAuth}) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { email, password, name } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password, name };

      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      // console.log(parseRes);
      if(parseRes.jwtToken) {
      localStorage.setItem("token", parseRes.jwtToken);
      setAuth(true);
      toast.success("Registered Successfully");
      }else if(parseRes.message) {
        toast.error(parseRes.message);
      }else{
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <h1 className="mt-5 text-center ">Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Email"
          onChange={(e) => onChange(e)}
          className="form-control my-3 w-75 text-center mx-auto"
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={(e) => onChange(e)}
          className="form-control my-3 w-75 text-center mx-auto"
        />
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Name"
          onChange={(e) => onChange(e)}
          className="form-control my-3 w-75 text-center mx-auto"
        />
        <button className="btn btn-success btn-block w-50 text-center mx-auto">
          Submit
        </button>
      </form>
      <Link to="/login" className='btn btn-primary btn-block w-25 my-5' style={{marginLeft:"170px"}}> Login Instead?</Link>
    </>
  );
};

export default Register;
