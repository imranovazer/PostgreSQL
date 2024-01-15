import "reflect-metadata"
import  express from 'express'; 
import { AppDataSource } from "./data-source"
import UserRoutes from './routes/UserRoutes'

const app = express() ;

const PORT = process.env.PORT || 3000



app.listen(PORT ,()=>
{
    console.log("Server has started on port ",PORT);
    
})


app.use('/user', UserRoutes) ;


AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
        console.log("DB initialized")
    })
    .catch((error) => console.log(error))