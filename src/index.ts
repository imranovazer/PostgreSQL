import "reflect-metadata"
import  express from 'express'; 
import { AppDataSource } from "./data-source"
import UserRoutes from './routes/UserRoutes'
import AuthRoutes  from './routes/AuthRoutes'
import PostRoutes from './routes/PostRoutes'
import 'dotenv/config'



const PORT = process.env.PORT || 3000
const app = express() ;
app.use(express.json()) ;




app.listen(PORT ,()=>
{
    console.log("Server has started on port ",PORT);
    
})


app.use('/user', UserRoutes) ;
app.use('/post',PostRoutes)
app.use('/auth', AuthRoutes)

AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
        console.log("DB initialized")
    })
    .catch((error) => console.log(error))