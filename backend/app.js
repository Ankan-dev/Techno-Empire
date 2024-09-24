require('dotenv').config({path:'.env'})
const express=require('express');
const cookieParser =require('cookie-parser');
const cors=require('cors');
const studentRoute=require('./routes/studentRoute.js');
const teacherRoute=require('./routes/teacherRoute.js')


const app=express();
const db_conn=require('./database/db_conn.js')
const port=process.env.PORT || 3000;

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(cookieParser())

app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({extended:true,limit:'16kb'}));
app.use(express.static("public"));

app.use('/app',studentRoute);
//app.use('/app',teacherRoute);


db_conn()
app.listen(port,()=>{
    console.log("server is being listened at the port 3000");
})