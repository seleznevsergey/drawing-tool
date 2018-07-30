const chai = require('chai');
const createFileParser = require('../src/fileParser');
const cmdStructure = require('../src/constants');

const { expect } = chai;
describe('fileParser', () => {
  it('should exist and be a function', () => {
    const { parseFileToCmdQueue, createCommandFromString } = createFileParser({ readFile: {}, cmdStructure });
    expect(parseFileToCmdQueue).to.be.a('function');
    expect(createCommandFromString).to.be.a('function');
  });
  it('createCommandFromString: should create cmd object from string', () => {
    const rawCmd = 'B 10 3 o';
    const expectedCmd = { cmd: 'B', args: [10, 3, 'o'] };
    const { createCommandFromString } = createFileParser({ readFile: {}, cmdStructure });
    const parsedCmd = createCommandFromString(rawCmd);
    expect(parsedCmd).to.deep.equal(expectedCmd);
  });
  it('parseFileToCmdQueue: should create cmd object from string', async () => {
    const inputFileMock = 'C 20 4\nL 1 2 6 2\nL 6 3 6 4\nR 16 1 20 3\nB 10 3 o';
    const readFileMock = () => Promise.resolve(inputFileMock);
    const expectedCmdQueue = [
      { cmd: 'C', args: [20, 4] },
      { cmd: 'L', args: [1, 2, 6, 2] },
      { cmd: 'L', args: [6, 3, 6, 4] },
      { cmd: 'R', args: [16, 1, 20, 3] },
      { cmd: 'B', args: [10, 3, 'o'] },
    ];
    const { parseFileToCmdQueue } = createFileParser({ readFile: readFileMock, cmdStructure });
    const cmdQueue = await parseFileToCmdQueue();
    expect(cmdQueue).to.deep.equal(expectedCmdQueue);
  });
});
