import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import ConnectDb from './config/db.config';
import cookieParser from 'cookie-parser';
import cors from 'cors'
dotenv.config();

const app = express();
const port = process.env.PORT || 8001;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())

ConnectDb().then(()=>{
    app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`http://localhost:${port}`)
});
}).catch(()=>{
   console.log('Error connecting to database')
})