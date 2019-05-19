const header = (data) => {
    let headers = [];

    headers['Cache-Control'] = 'public, max-age=2592000';
    headers['Expires'] = new Date(Date.now() + 2592000000).toUTCString();
    headers['ContentType'] = `image/${data.format}`;

    if (data.download) {
        headers['content-disposition'] = `attachment; filename="${data.name}"`;
    } else {
        headers['content-disposition'] = `inline; filename="${data.name}"`;
    }

    return headers;
}

module.exports = header;