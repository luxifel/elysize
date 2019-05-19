"use strict"

const express = require('express');
const request = require('request');
const helmet = require('helmet');
const cors = require('cors');
const parser = require('.parser/parser');
const buffer = require('.buffer/buffer');
const header = require('./buffer/header');
const config = require('./config/config');
const server = express();

const serveResized = (req, res) => {

    if (req.originalUrl !== '/favicon.ico') {
        const Urldata = parser(req);

        const headers = header(Urldata);

        res.type(headers['ContentType']);
        res.set({
            'content-disposition': headers['content-disposition'],
            'Cache-Control': headers['Cache-Control'],
            'Expires': headers['Expires']
        });

        const domain = config("domain");

        let url = (Urldata.url) ? Urldata.requestUrl : domain + Urldata.pathname;

        if (Urldata.api) {
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
            let localBaseUrl = './media';
            let localImg = localBaseUrl + Urldata.pathname;

            buffer(localImg, Urldata.format, Urldata.width, Urldata.height).pipe(res);
        }
    }
};

server.use(helmet());
server.use(cors());

server.get('/*', serveResized);

server.listen(5000, () => {
    console.log('Server started!');
});
