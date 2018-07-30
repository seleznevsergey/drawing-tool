function createFileParser({ readFile, cmdStructure }) {
  async function parseFileToCmdQueue(filename) {
    const file = await readFile(filename, 'utf-8');
    const rawCommands = splitToRawCommandStrings(file);
    return parseRawCommandStrings(rawCommands);
  }

  function splitToRawCommandStrings(file) {
    return file.split('\n');
  }

  function parseRawCommandStrings(cmds) {
    return cmds.reduce((acc, rawCmd) => {
      if (!rawCmd) {
        return acc;
      }
      return [...acc, createCommandFromString(rawCmd)];
    }, []);
  }

  function createCommandFromString(rawCmd) {
    const [cmdType, ...args] = rawCmd.split(' ');
    const conversedArgs = converseCommandArgs(cmdStructure[cmdType], args);
    return { cmd: cmdType, args: conversedArgs };
  }

  function converseCommandArgs(argStructure, args) {
    return argStructure.map((conversionFunc, index) => conversionFunc(args[index]));
  }

  return {
    parseFileToCmdQueue,
    createCommandFromString,
  };
}

module.exports = createFileParser;
