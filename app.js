import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {gradeRouter} from './routes/gradeRouter.js';
import dotenv from 'dotenv';
dotenv.config();

import { db } from './models/index.js';

// console.log(process.env.MONGODB);

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected succesfully!')
  } catch (error) {
    console.log('Failed to connect to database!');
    process.exit();
  }
})();

const app = express();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:8080',
  })
);

app.get('/', (req, res) => {
  res.send('API running');
});

app.use(gradeRouter);

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`API running at port ${port} port!`)
});
