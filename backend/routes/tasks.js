require('dotenv').config(); // Load .env

const express = require("express");
const TaskRoute = express.Router();
const {z} = require("zod");
const { taskModel } = require("../db");
const { auth } = require("../middleware")


TaskRoute.post("/task",auth, async function(req,res){
    const validedData = z.object({
        title:z.string(),
        detail:z.string(),
        isDone:z.boolean()
    })

    const parsed = validedData.safeParse(req.body)

    if(!parsed.success){
        res.json({
            msg:"incorrect format",
            error:parsed.error
        })
        return
    }

    const { title, detail, isDone} = req.body
    const userId = req.userId;

    try{
        const task = await taskModel.create({
            userId:userId,
            title:title,
            detail:detail,
            isDone:isDone
        });

        console.log(task);
         res.status(201).json({ msg: "Todo Created", task});
    }catch(error){

    console.error("Error during user signup:", error);
    res.status(500).json({
        message: "Todo Not Created",
        error: error.message
    });
   }

})

TaskRoute.get("/tasks",auth, async function(req,res){
    const userId = req.userId;
    console.log(userId);
   try{
    const tasks = await taskModel.find({
        userId:userId
    })
 
      if (tasks.length === 0) {
            return res.status(404).json({ msg: "No todos found" });
        }

        // console.log(tasks)

       res.json({
        tasks
    })
}catch (error) {
        res.status(500).json({ msg: "Error fetching todos", error: error.message });
    }
})

TaskRoute.put("/task",auth,async function(req,res){
     const userId = req.userId;
     const {title, detail, isDone, taskId } = req.body;

    //  console.log(title);
    //  console.log(detail);
    //  console.log(isDone);
    //  console.log(taskId);

    if(!taskId || !title || typeof isDone === "undefined"){
        return res.status(400).json({
            msg:"missing or invalid data"
        })
    }

    try{
        const task = await taskModel.findOneAndUpdate(
            {_id: taskId, userId}, // filter
            { title, detail, isDone }, // Update
            { new: true }// Return update doc
        );
        if(!task){
            return res.status(404).json({
                msg: "Todo not found of unauthorized"})
        }

        res.status(200).json({
            msg: "todo upDated",
            task
        });
    } catch(error){
        console.error("Error updating todo:",error);
        res.status(500).json({
            msg:"Internal server errror",
            error: error.message
        })
    }
})


TaskRoute.put("/taskToggle",auth,async function(req,res){
     const userId = req.userId;
     const { isDone,taskId } = req.body;
     console.log(taskId);

    if(!taskId || typeof isDone === "undefined"){
        return res.status(400).json({
            msg:"missing or invalid data"
        })
    }

    try{
        const task = await taskModel.findOneAndUpdate(
            {_id: taskId,userId}, // filter
            { isDone }, // Update
            { new: true }// Return update doc
        );
        if(!task){
            return res.status(404).json({
                msg: "Todo not found of unauthorized"})
        }

        res.status(200).json({
            msg: "todo upDated",
            task
        });
    } catch(error){
        console.error("Error updating todo:",error);
        res.status(500).json({
            msg:"Internal server errror",
            error: error.message
        })
    }
})

TaskRoute.delete("/task",async function(req,res){
     const taskId = req.body.taskId;
    //  console.log(todoId);

         if (!taskId) {
        return res.status(400).json({ msg: "Missing todoId" });
    }

     const task = await taskModel.findById(
        taskId)

     if(task){
        await taskModel.deleteOne({ _id: taskId });
         res.status(200).json({ msg: "Todo deleted" });
     }else {
        res.status(403).send({
            msg:"user not found"
        })
    }
})

module.exports = {
    TaskRoute
}