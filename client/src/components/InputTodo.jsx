import {useState} from 'react'
import { toast } from 'react-toastify';
// import axios from 'axios';
const InputTodo = () => {

    const [description,setDescription]=useState("");

  const AddTodo = async (e) => {
    if(description===''){
        e.preventDefault();
        toast.error('Please enter a description');
        return;
    }
    else{
        e.preventDefault();
        const body= {description};
        // console.log("Description:-" , description);
        
        const response=await fetch("http://localhost:5000/todos",{
          method:"POST",
          headers:{"Content-Type":"application/json",token:localStorage.token},
          body: JSON.stringify(body)    
        })
        const parseRes = await response.json();

        if(parseRes[0].todo_id){
            toast.success('Todo added successfully');
            setDescription('');
            // window.location.reload(); or
            window.location="/dashboard";

        }
        else{
            toast.error('Failed to add todo');
            return;
        }
    }

  }
    

  return (
    <>
    <form action="" className=' d-flex '>

        <input type="text" className=' my-3 w-75' style={{marginLeft:"6rem"}}
            value={description} 
            placeholder="Add Todo"
            onChange={(e)=> setDescription(e.target.value)}

        />
        <button className='btn btn-primary' onClick={AddTodo}>Add</button>
    </form>
    </>
  )
}

export default InputTodo