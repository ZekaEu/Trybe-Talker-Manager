const { readFileSync, writeFileSync } = require('fs');

const tokenCheck = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const nameCheck = (req, res, next) => {
  const { name } = req.body;

  if (!name || !name.length) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const ageCheck = (req, res, next) => {
  const { age } = req.body;

  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (parseInt(age, 10) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const talkCheck = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || talk.watchedAt === undefined || talk.rate === undefined) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};

const dateAndRateCheck = (req, res, next) => {
  const { talk: { watchedAt, rate } } = req.body;
  const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/-]\d{4}$/;

  if (!dateRegex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const addTalker = (req, res) => {
  const { name,
    age,
    talk: { watchedAt, rate },
  } = req.body;
  const talkerArr = JSON.parse(readFileSync('talker.json'));

  const newTalker = {
    name,
    id: talkerArr.length + 1,
    age,
    talk: { watchedAt, rate },
  };

  talkerArr.push(newTalker);
  writeFileSync('talker.json', JSON.stringify(talkerArr));
  return res.status(201).json(newTalker);
};

module.exports = {
  tokenCheck,
  nameCheck,
  ageCheck,
  talkCheck,
  dateAndRateCheck,
  addTalker,
};
