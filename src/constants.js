const number = key => Number(key);
const string = key => String(key);

const cmdStructure = {
  C: [number, number],
  L: [number, number, number, number],
  R: [number, number, number, number],
  B: [number, number, string],
};

module.exports = cmdStructure;
