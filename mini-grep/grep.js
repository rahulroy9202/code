// Since first two arguments are node executable path and script location.
let args = process.argv.slice(2);

// Using builtin modules, comes with somewhat acceptable error messages.
let lineReader = require('readline').createInterface({input: require('fs').createReadStream(require('path').resolve(args[0]))});

//The 'line' event is emitted whenever the input stream receives an end-of-line input (\n, \r, or \r\n)
lineReader.on('line', line => (line.indexOf(args[1]) !== -1) && console.log(line));
