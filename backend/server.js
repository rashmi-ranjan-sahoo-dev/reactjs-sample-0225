require('dotenv').config(); // Load .env

const express = require("express");
const cors = require("cors")
const app = express();
const mongoose = require("mongoose");
const { UserRoute } = require("./routes/user")
const { TaskRoute } = require("./routes/tasks")

app.use(express.json());
app.use(cors())
app.use("/api/v1/users",UserRoute)
app.use("/api/v1/todos",TaskRoute)

async function main() {  
    await mongoose.connect(process.env.DB_KEY)
    app.listen(process.env.PORT, () => console.log("listening on the port 3000"))
}

main();
