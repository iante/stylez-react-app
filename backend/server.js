import express from 'express';
import data from './data';
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
//import dotenv from 'dotenv';
import orderRoute from './routes/orderRoute';
import productRoute from './routes/productRoute';
import uploadRoute from './routes/uploadRoute';
import userRoute from './routes/userRoute';


//dotenv.config();
const mongodbUrl = config.MONGODB_URL;

mongoose.connect(mongodbUrl, {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));

{/* server that renders the products to the clients*/}

const app = express();

app.use(bodyParser.json());

/* route for admin login*/
app.use("/api/users", userRoute);
app.use('/api/orders', orderRoute);
app.use('/api/uploads', uploadRoute);
app.use('/api/products', productRoute);

app.get('/api/config/paypal', (req, res) => {
   res.send(config.PAYPAL_CLIENT_ID);
 });

 app.use(express.static(path.join(__dirname, '/../fronte/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../fronte/build/index.html`));
});

app.listen(config.PORT, () => {
   console.log('Server started at http://localhost:5000');
 });
