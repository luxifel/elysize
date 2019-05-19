"use strict"

const express = require('express');
const request = require('request');
const helmet = require('helmet');
const cors = require('cors');
const parser = require('./parser/parser');
const buffer = require('./buffer/buffer');
const server = express();

const serveResized = (req, res) => {

    if (req.originalUrl !== '/favicon.ico') {
        const Urldata = parser(req);
        const headers = Urldata.header;

        console.log(Urldata);
        res.type(headers['ContentType']);
        res.set({
            'content-disposition': headers['content-disposition'],
            'Cache-Control': headers['Cache-Control'],
            'Expires': headers['Expires']
        });

        let url = Urldata.url;

        if (Urldata.domain) {
            request.get({
                url,
                encoding: null
            }, (error, response, body) => {
                if (error) {
                    console.log('ERROR -> ' + error);
                } else {
                    buffer(body, Urldata.format, Urldata.width, Urldata.height).pipe(res);
                }
            });
        } else {
            buffer(url, Urldata.format, Urldata.width, Urldata.height).pipe(res);
        } 
    } 
};

server.use(helmet());
server.use(cors());

server.get('/*', serveResized);

server.listen(5000, () => {
    console.log('Server started!');
});
