const server = require('__sapper__/build/server/server.js');
exports.sapper = (req, res) => {
    server.app(req, res);
};