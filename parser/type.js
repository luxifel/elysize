const Config = require('../config/config');

const type = (data) => {

    let config = Config();

    switch (config.type.rule){
        case "regex":
            data.pathname.match(config.value);
            data.width = RegExp.$1 ? Number(RegExp.$1) : data.width;
            data.height = RegExp.$2 ? Number(RegExp.$2) : data.height;
        break;
        case "custom":
        break;
    }
    
    return data;
}

module.exports = type;