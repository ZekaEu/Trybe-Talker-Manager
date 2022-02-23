const express = require('express');
const { readFileSync } = require('fs');

const talkerRouter = express.Router();

talkerRouter.get('/', (_req, res) => {
  const talkerArr = JSON.parse(readFileSync('talker.json'));
  if (!talkerArr.length) return res.status(200).send(talkerArr);
  res.status(200).json(talkerArr);
});

module.exports = talkerRouter;
