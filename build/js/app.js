"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
const router_1 = require("./routs/router");
const app = (0, express_1.default)();
const PORT = 5000;
/**EJS**/
app.use(express_1.default.urlencoded({ extended: true }));
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/**Public path**/
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
/**Body parser**/
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
/**Cors policy**/
app.use((0, cors_1.default)());
/**Use router**/
app.use('/', router_1.Api);
/**Express EJS layouts**/
app.use(express_ejs_layouts_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
