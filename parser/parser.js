const Url = require('url');
const path = require('path');
const type = require('./type');
const source = require('./source');
const Header = require('./header');


const parser = (req) => {

    let url = req.query.url;
    let requestUrl = req.query.url ? Url.parse(url) : Url.parse(req.originalUrl);
    let pathname = requestUrl.pathname;
    let extension = path.extname(pathname);
    let source = source();

    let data = {
        domain : source.domain,
        requestDomain: req.header('Referer'),
        url : url || source.domain + source.path,
        requestUrl : requestUrl,
        pathname : pathname,
        name : req.query.name ? (req.query.name + extension) : path.basename(pathname),
        download : Boolean(req.query.download) || false,
        format : req.query.format || 'jpg',
        width = req.query.w ? Number(req.query.w) : null,
        height = req.query.h ? Number(req.query.h) : null
    };

    data.header = Header(data);
    data = type(data);

    return data;
}

module.exports = parser;