const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
});

const taskSchema = new Schema({
    title:String,
    detail:String,
    userId:ObjectId,
    isDone:Boolean
})
const userModel = mongoose.model("user", userSchema);
const taskModel = mongoose.model("tasks",taskSchema)

module.exports = {
    userModel,
    taskModel
}