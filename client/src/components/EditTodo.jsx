import  { useState } from "react";

const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);

  //edit description function

  const updateDescription = async e => {
    e.preventDefault();
    try {
      const body = { description };
       await fetch(
        `http://localhost:5000/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json", token:localStorage.token },
          body: JSON.stringify(body)
        }
      );
      
      window.location = "/dashboard";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
<button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#id${todo.todo_id}`}>
  Edit
</button>

<div className="modal fade" id={`id${todo.todo_id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Todo</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <input type="text" name="" id="" value={description}  onChange={e => setDescription(e.target.value)}/>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={updateDescription}>Save changes</button>
      </div>
    </div>
  </div>
</div>
    </>
  );
};

export default EditTodo;