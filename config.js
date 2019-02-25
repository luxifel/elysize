var fs = require('fs');

const config = (data) => {
    var file = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
    return file.to;
}

module.exports = config;