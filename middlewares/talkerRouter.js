const express = require('express');
const { readFileSync } = require('fs');
const {
  tokenCheck,
  nameCheck,
  ageCheck,
  talkCheck,
  dateAndRateCheck,
  addTalker,
} = require('./createTalker');
const updateTalker = require('./updateTalker');

const talkerRouter = express.Router();

const getTalkerArr = () => JSON.parse(readFileSync('talker.json'));

talkerRouter.get('/', (_req, res) => {
  if (!getTalkerArr().length) return res.status(200).send(getTalkerArr());
  res.status(200).json(getTalkerArr());
});

talkerRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const talkerById = getTalkerArr()
    .find((t) => t.id === parseInt(id, 10));
  if (!talkerById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(talkerById);
});

talkerRouter.post('/',
  tokenCheck,
  nameCheck,
  ageCheck,
  talkCheck,
  dateAndRateCheck,
  addTalker);

talkerRouter.put('/:id',
  tokenCheck,
  nameCheck,
  ageCheck,
  talkCheck,
  dateAndRateCheck,
  updateTalker);

module.exports = talkerRouter;
