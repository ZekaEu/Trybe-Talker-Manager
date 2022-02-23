const express = require('express');
const bodyParser = require('body-parser');
const talkerRouter = require('./middlewares/talkerRouter');
const { emailCheck, passwordCheck, generateToken } = require('./middlewares/login');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talkerRouter);
app.post('/login', emailCheck, passwordCheck, generateToken);

app.listen(PORT, () => {
  console.log('Online');
});
