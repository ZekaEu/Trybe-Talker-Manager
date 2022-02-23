const { readFileSync, writeFileSync } = require('fs');

const updateTalker = (req, res) => {
  const { id } = req.params;
  const { name,
    age,
    talk: { watchedAt, rate },
  } = req.body;

  const talkerArr = JSON.parse(readFileSync('talker.json'));
  const talkerIndex = talkerArr.findIndex((t) => t.id === id);

  const overwritedTalker = {
    id: parseInt(id, 10),
    name,
    age,
    talk: { watchedAt, rate },
  };
  talkerArr.splice(talkerIndex, 1, overwritedTalker);
  writeFileSync('talker.json', JSON.stringify(talkerArr));
  return res.status(200).json(overwritedTalker);
};

module.exports = updateTalker;