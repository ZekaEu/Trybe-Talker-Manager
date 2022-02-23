const { readFileSync, writeFileSync } = require('fs');

const deleteTalker = (req, res) => {
  const { id } = req.params;

  const talkerArr = JSON.parse(readFileSync('talker.json'));
  const talkerIndex = talkerArr.findIndex((t) => t.id === id);
  talkerArr.splice(talkerIndex, 1);
  writeFileSync('talker.json', JSON.stringify(talkerArr));
  return res.status(204).end();
};

module.exports = deleteTalker;