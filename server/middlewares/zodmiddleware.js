
import express from "express";

// function validate(schema )
const validate = (schema) => async(req,res,next)=>{
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        //err has many values like issues, message and errors
        // console.error(err.errors);
        res.status(500).send({message: err.errors[0].message});
    }
}

export  default validate;