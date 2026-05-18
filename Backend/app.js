import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import cors from "cors"
import authRoutes from "./routes/authRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js"


const app = express();
const port = process.env.PORT || 8080;

dotenv.config()
connectDB()

//middlewares
app.use(cors())
app.use(express.json())


//routes
app.use("/api/auth", authRoutes);
app.use("/api/volunteers",volunteerRoutes)




app.listen(port,()=>{
    try {
        console.log(`Server started on port ${port}`)
    } catch (error) {
        console.log(error);
    }
})

