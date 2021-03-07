"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import photosRouter from "./routers/photos";
require("./db/connection");
const app = express_1.default();
const PORT = process.env.PORT || 3300;
// app.use(cors()); // allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served
// app.use(photosRouter);
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});
//# sourceMappingURL=index.js.map