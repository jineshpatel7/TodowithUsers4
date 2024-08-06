import {React,useState,useEffect} from 'react'
import EditTodo from "./EditTodo"
const ListTodo = () => {

    const [todos, setTodos] = useState([]);

    const getTodos = async()=>{
        try {
            const response = await fetch("http://localhost:5000/todos",{
                method: "GET",
                headers: {token: localStorage.token}
            });
            const parseRes = await response.json();
            // console.log("ParseREs",parseRes)
            setTodos(parseRes);
            
        } catch (error) {
            console.error(error.message);
        }
    }
    useEffect(() =>{
        getTodos();
    },[])

    const DeleteTodo = async (id) => {
        try {
            await fetch(`http://localhost:5000/todos/${id}`,{
                method: "DELETE",
                headers: {token: localStorage.token}
            });
            getTodos();
        } catch (error) {
            console.error(error.message);
        }
    }
  return (
    <>
    <table className='table table-striped mt-5 text-center'>
        <thead>
            <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
            </tr>
        </thead>
            <tbody>
        {todos.length !== 0 &&
        todos[0].todo_id !== null &&
        todos.map(todo => (
            <tr  key={todo.todo_id}>
                <td>{todo.description}</td>
                <td>
                    <EditTodo todo={todo} />    
                </td>
                <td>
                    <button className='btn btn-danger'  onClick={() => DeleteTodo(todo.todo_id)}>Delete</button>
                </td>
            </tr>
            ))}
            </tbody>
    </table>

    </>
  )
}

export default ListTodo