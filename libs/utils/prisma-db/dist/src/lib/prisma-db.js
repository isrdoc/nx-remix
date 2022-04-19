"use strict";
exports.db = void 0;
var _client = require("@prisma/client");
let db;
exports.db = db;
// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env['NODE_ENV'] === 'production') {
    exports.db = db = new _client.PrismaClient();
} else {
    if (!global.__db) {
        global.__db = new _client.PrismaClient();
    }
    exports.db = db = global.__db;
}

//# sourceMappingURL=prisma-db.js.map