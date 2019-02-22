"use strict"

const express = require('express');
const server = express();
const Url = require('url');
const path = require('path');
const request = require('request');
const buffer = require('./buffer');

const serveResized = (event, context) => {
    const url = event.query.url;

    if (url) {
        const pathname = Url.parse(url).pathname;
        const extension = path.extname(pathname);
        const name = event.query.name ? (event.query.name + extension) : path.basename(pathname);
        const download = Boolean(event.query.download) || false
        const format = event.query.format || 'jpg'

        const headers = [];
        headers['Cache-Control'] = 'public, max-age=2592000';
        headers['Expires'] = new Date(Date.now() + 2592000000).toUTCString();

        if (download) {
            headers['content-disposition'] = `attachment; filename="${name}"`;
            context.setHeader('Content-Disposition', headers['content-disposition']);
        } else {
            headers['content-disposition'] = `inline; filename="${name}"`;
        }

        request.get({
            url,
            encoding: null
        }, (error, response, body) => {
            if (error) {
                context.fail(error);
            } else {
                headers['Content-Type'] = response.headers['content-type'];

                // If the file is Image
                // And has to be resized
                if ((event.query.width || event.query.height) && (extension === '.png' || extension === '.jpg' || extension === '.jpeg')) {
                    const width = event.query.width ? Number(event.query.width) : null;
                    const height = event.query.height ? Number(event.query.height) : null;

                    context.type(`image/${format}`);

                    buffer(body, format, width, height).pipe(context);
                } else {
                    context
                        .status(200)
                        .type('image/jpg')
                        .send(body);
                }
            }
        })
    }
}

const serveLocalResized = (event, context) => {
    const baseUrl = './media';
    const requestUrl = Url.parse(event.originalUrl);
    const pathname = requestUrl.pathname.replace('/resizedimage/','/');
    const extension = path.extname(pathname);
    const name = event.query.name ? (event.query.name + extension) : path.basename(pathname);
    const download = Boolean(event.query.download) || false
    const format = event.query.format || 'jpg'

    const headers = [];
    headers['Cache-Control'] = 'public, max-age=2592000';
    headers['Expires'] = new Date(Date.now() + 2592000000).toUTCString();

    if (download) {
        headers['content-disposition'] = `attachment; filename="${name}"`;
        context.setHeader('Content-Disposition', headers['content-disposition']);
    } else {
        headers['content-disposition'] = `inline; filename="${name}"`;
    }

    if ((event.query.w || event.query.h) && (extension === '.png' || extension === '.jpg' || extension === '.jpeg')) {
        const width = event.query.w ? Number(event.query.w) : null;
        const height = event.query.h ? Number(event.query.h) : null;
        const img = baseUrl + pathname;
        context.type(`image/${format}`);

        buffer(img, format, width, height).pipe(context);

    } else {
        context
            .status(200)
            .type('image/jpg')
            .send(body);
    }
}

server.get('/', serveResized);
server.get('/resizedimage/*', serveLocalResized);

server.listen(5000, () => {
    console.log('Server started!');
});
