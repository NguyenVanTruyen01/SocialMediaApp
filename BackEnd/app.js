require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const connectDB = require('./connectDB/connectDB');
const cors = require('cors');

const AuthRouter = require('./Routers/AuthRouter');
const UserRouter = require('./Routers/UserRouter');
const PostRouter = require('./Routers/PostRouter');
const UploadImgRouter = require('./Routers/UploadRouter');
const { use } = require('./Routers/AuthRouter');
// -------------------------------------------------------------------

const app = express();


// middleware
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


// cho phep truy cap vao thu muc public/image de lay hinh anh
app.use(express.static("public"));
app.use('/images', express.static("image"));

// routers
app.use('/auth', AuthRouter);
app.use('/user', UserRouter);
app.use('/post', PostRouter);
app.use('/upload', UploadImgRouter);



const PORT = process.env.PORT || 5000;
const start = async () => {
    try {
        //Connect database
        await connectDB(process.env.MONGO_URL);
        console.log("Connect database successful");
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        })
    }
    catch (err) {
        console.log(err)
    }
}

start();
