const promisify = require('util').promisify;
const fs = require('fs');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const createFileParser = require('./fileParser');
const cmdStructure = require('./constants');
const drawer = require('./drawer');
const config = require('./config');

const { inputFilePath, outputFilePath } = config;
const { parseFileToCmdQueue } = createFileParser({ readFile, cmdStructure });

async function startApp() {
  const cmdQueue = await parseFileToCmdQueue(inputFilePath);
  const results = cmdQueue.reduce(
    (acc, { cmd, args }) => {
      const canvas = drawer[cmd](acc.canvas, ...args);
      return { canvas, cmdResults: [...acc.cmdResults, stringifyCanvas(canvas)] };
    },
    { canvas: [], cmdResults: [] },
  );
  const outData = results.cmdResults.reduce((acc, canvas) => acc.concat(canvas), '');
  await writeFile(outputFilePath, outData);
}

function stringifyCanvas(canvas) {
  return canvas.reduce((acc, row) => {
    return acc.concat(row.join('').concat('\n'));
  }, '');
}

startApp();
