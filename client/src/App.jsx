import {useState,useEffect} from 'react';
// import ReactDOM from 'react-dom';
// import { toast } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";


// import './App.css';
import {BrowserRouter as Router, Route,Routes, Navigate} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
// toast.configure();
function App(){

    // render={props=> !isAuthenticated ? (<Login {...props}/>) : (<redirect("/dashboard")/>)}
    const [isAuthenticated,setAuthenticated]= useState(false);

    const setAuth= (boolean)=>{
        setAuthenticated(boolean); 
    }

    const isAuth=async ()=>{
        try {
            const response= await fetch("http://localhost:5000/auth/verify",{
                method: "GET",
                headers: {token:localStorage.token}
            })

            const parseRes= await response.json();

            // setAuthenticated(parseRes);
            parseRes===true ? setAuthenticated(true) : setAuthenticated(false)

        } catch (error) {
            console.error(error.message);
            
        }

    }

    useEffect(()=>{
        isAuth();
    },[]);

    return(
    <>
    <Router>
        <Routes>
            <Route exact path='/dashboard' element={ (isAuthenticated ? < Dashboard setAuth={setAuth}/> : <Navigate to="/login" />)}  />
            <Route exact path='/login' element={ !isAuthenticated? <Login setAuth={setAuth} /> : <Navigate to="/dashboard"/>}/>
            <Route exact path='/register' element={!isAuthenticated? <Register setAuth={setAuth} /> : <Navigate to="/login "/>}/>
        </Routes>
        
    
    </Router>
    </>
    )
}
export default App;