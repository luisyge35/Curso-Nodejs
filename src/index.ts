import express ,{Application} from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app:Application = express(); 

app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());

const PORT: number | string = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`running on: ${PORT}`);
    });
  }).catch(error => {
    console.log('MongoDB error: ', error);
  });