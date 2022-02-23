const { randomBytes } = require('crypto');

const emailCheck = (req, res, next) => {
  const { email } = req.body;
  const checkRegex = /.+@.+\.com/i;

  if (!email || !email.length) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!checkRegex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const passwordCheck = (req, res, next) => {
  const { password } = req.body;

  if (!password || !password.length) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const generateToken = (_req, res) => {
  const token = randomBytes(8).toString('hex');
  return res.status(200).json({ token: `${token}` });
};

module.exports = {
  emailCheck,
  passwordCheck,
  generateToken,
};
