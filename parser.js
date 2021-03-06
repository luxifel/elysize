const Url = require('url');
const path = require('path');


const parser = (req) => {

    const regexCache = /\/cache\//gm;

    let url = req.query.url;
    let requestUrl = req.query.url ? Url.parse(url) : Url.parse(req.originalUrl);
    let pathname = requestUrl.pathname;
    let extension = path.extname(pathname);
    let cache = regexCache.test(pathname) || false;
    let data = {
        domain : req.header('Referer'),
        url : false,
        pathname : pathname,
        name : req.query.name ? (req.query.name + extension) : path.basename(pathname),
        download : Boolean(req.query.download) || false,
        format : req.query.format || 'jpg',
        cacheFile : cache,
        api:true
    };

    if (url){
        data.url = true;
        data.requestUrl = url;
        data.width = req.query.w ? Number(req.query.w) : null;
        data.height = req.query.h ? Number(req.query.h) : null;
    }

    if (data.cacheFile){
        const regexParseUrlCache = /\/media\/catalog\/(?<entity>[a-z]+)\/cache\/\w+\/(?<image>[a-z]+)?\/?(?<width>\d+)x(?<heigh>\w*)(?<path>\/.+)/gm;
        pathname.match(regexParseUrlCache);
        data.cacheFile = true;
        data.width = RegExp.$3 ? Number(RegExp.$3) : null;
        data.height = RegExp.$4 ? Number(RegExp.$4) : null;
        data.pathname = '/media/catalog/' + RegExp.$1 + RegExp.$5;
    }

    return data;
}

module.exports = parser;