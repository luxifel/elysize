const config = require('../config/config');

const type = (data) => {

    //parse url based on type


    let config = config("type");
    
    switch (config.type.rule){
        case "regex":
        break;
        case "custom":
        break;
    }
    
    return data;
}

module.exports = type;