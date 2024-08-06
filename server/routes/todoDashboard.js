import db from "../db.js"
import express from "express";
import authorize from "../middlewares/authorize.js";

const router= express.Router();

router.get("/", authorize , async (req, res) => {
    try {
        
        const users= await db.query("SELECT users.username, todos.todo_id, todos.description FROM users LEFT JOIN todos ON users.user_id = todos.user_id WHERE users.user_id = $1 order by todos.todo_id", [req.user]);

        // console.log(users.rows);
        
        res.json(users.rows);   

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

router.post("/", authorize , async (req, res) => {
    try {


        const insertTodo = await db.query("Insert into todos(user_id,description) VALUES ($1, $2) RETURNING *", [req.user, req.body.description]);
        
        const users= await db.query("SELECT users.username, todos.todo_id, todos.description FROM users LEFT JOIN todos ON users.user_id = todos.user_id WHERE users.user_id = $1", [req.user]);

        res.json(users.rows);

    } catch (error) {
        console.error(error.message);
    }
})

router.put("/:id" , authorize , async (req, res) => {
    try {

        const {id} =req.params
        // console.log(id);
        
        const updateTodo= await db.query("Update todos set description = $1 WHERE todo_id = $2", [req.body.description, id]);

        const users= await db.query("SELECT users.username, todos.todo_id, todos.description FROM users LEFT JOIN todos ON users.user_id = todos.user_id WHERE users.user_id = $1", [req.user]);

        res.json(users.rows);

        

    } catch (error) {
        console.error(error.message);
    }
})


router.delete("/:id" , authorize , async (req, res) => {
    try {
        // console.log("ID",req.params.id);

        const {id} =req.params;        
        // console.log(id);
        
        const deleteTodo= await db.query("DELETE FROM todos WHERE todo_id = $1", [req.params.id]);

        const users= await db.query("SELECT users.username, todos.todo_id, todos.description FROM users LEFT JOIN todos ON users.user_id = todos.user_id WHERE users.user_id = $1", [req.user]);

        res.json(users.rows);

    }catch(err){
        console.error(err.message);
    }
})

export default router;
