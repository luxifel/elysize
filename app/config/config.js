var fs = require('fs');

const config = (param = null) => {
    var file = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
    return param ? file.param : file;
}

module.exports = config;