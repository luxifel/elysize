const config = require('../config/config');

const type = (data) => {

    let config = config("type");

    switch (config.rule){
        case "regex":
            data.pathname.match(config.value);
            data.width = RegExp.$1 ? Number(RegExp.$1) : null;
            data.height = RegExp.$2 ? Number(RegExp.$2) : null;
        break;
        case "custom":
        break;
    }
    
    return data;
}

module.exports = type;