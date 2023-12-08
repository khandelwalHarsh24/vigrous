const express=require('express');
const app=express();
const connectdb = require('./Db/connectdb');
const port=3000;
require('dotenv/config');
const cors=require('cors');
const userRoutes=require('./routes/userRoute');

app.use(cors());
app.use('*',cors());

app.use(express.json());


app.use('/api/v1',userRoutes);

const start=async ()=>{
    try {
        await connectdb(process.env.url);
        app.listen(port,console.log(`Server Listening To The Port ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start();