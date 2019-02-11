const sharp = require('sharp');


module.exports = function buffer(img, format, width, height) {
    return sharp(img).toFormat(format).resize(width, height);
};