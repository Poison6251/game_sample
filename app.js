import express from 'express';
import goodsRouter from './routes/goods.js';
import connect from './schemas/index.js';

const app = express();
const PORT = 4000;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});

app.use('/api', [goodsRouter]);


connect();