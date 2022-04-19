"use strict";
var _prismaDb = require("./lib/prisma-db");
Object.keys(_prismaDb).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (key in exports && exports[key] === _prismaDb[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _prismaDb[key];
        }
    });
});

//# sourceMappingURL=index.d.js.map