const Config = require('../config/config');

const source = () => {
    let config = Config();
    let data = {};
    data.path = config.source.path;
    
    switch (config.source.auth){
        case "domain":
            data.domain = config.source.domain;
        break;
        case "s3":
        break;
        case "cdn":
        break;        
        default:
            data.domain = false;
        break;        
    }
    
    return data;
}

module.exports = source;