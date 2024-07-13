const express = require("express")
const app = express()
const mongoose = require("mongoose")
require("dotenv/config")
const Todo = require("./db/connect")
app.use(express.json())

const port = process.env.PORT


app.post("/",async(req,res)=>{
    // Stage 1-> Client Sends Data
    const {vishal,ram,completed} = req.body;
    // Stage 2-> Data Validation
    // Step 3-> Put to db
    const todo = await Todo.create({title:vishal,description:ram,completed})
    if(!todo){
        return res.status(500).json({message:"Internal Server Error"})
    }
    res.json(todo)
})

app.get("/",async(req,res)=>{
    const todos = await Todo.find()
    if(!todos){
        return res.status(500).json({message:"Internal Server Error"})
    }
    res.json(todos)
})

app.put("/",async(req,res)=>{
    const {id,title,description,completed} = req.body;
    const todo = await Todo.findByIdAndUpdate(id,{title,description,completed},{new:true})
    if(!todo){
        return res.status(500).json({message:"Internal Server Error"})
    }
    res.json(todo)
})

async function connect() {
    try {
      await mongoose.connect(process.env.MONGOOSE_CONNECTION_URI);
      app.listen(port, () => {
        console.log(`Listening at port ${port}`);
      });
    } catch (error) {
      console.log(error);
    }
}
connect();