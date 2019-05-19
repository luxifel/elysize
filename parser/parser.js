const Url = require('url');
const path = require('path');
const type = require('./type');
const Source = require('./source');
const Header = require('./header');


const parser = (req) => {

    let url = req.query.url;
    let requestUrl = req.query.url ? Url.parse(url) : Url.parse(req.originalUrl);
    let pathname = requestUrl.pathname;
    let extension = path.extname(pathname);
    let source = Source();

    let data = {
        domain : source.domain,
        requestDomain: req.header('Referer'),
        requestUrl : requestUrl,
        pathname : pathname,
        name : req.query.name ? (req.query.name + extension) : path.basename(pathname),
        download : Boolean(req.query.download) || false,
        format : req.query.format || 'jpg',
    };
    
    data.url = url || (data.domain || "") + source.path + data.pathname;
    data.width = req.query.w ? Number(req.query.w) : null,
    data.height = req.query.h ? Number(req.query.h) : null
    data.header = Header(data);
    data = type(data);

    return data;
}

module.exports = parser;