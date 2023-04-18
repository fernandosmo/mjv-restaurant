import cors from 'cors';
import express from 'express';
import connection from './config/database';
import routes from './routes';


const app = express();

app.use(cors());
app.use(express.json());

app.use(routes)

const port = 4545;

connection.then(() => {
  console.log(`Database connected!`);
  app.listen(port, () => {
  console.log(`Application running on port ${port}`);
  console.log(`http://localhost:${port}`);
});
}).catch((err) => console.log(err));
