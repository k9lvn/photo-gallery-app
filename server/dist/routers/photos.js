"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const Photo_1 = __importDefault(require("../model/Photo"));
const Router = express_1.default.Router();
const upload = multer_1.default({
    limits: {
        fileSize: 1000000, // max file size 1MB = 1000000 bytes
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpeg|jpg)$/)) {
            cb(new Error("only upload files with jpg or jpeg format."));
        }
        cb(undefined, true); // continue with upload
    },
});
Router.post("/photos", upload.single("photo"), // process a single file
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const photo = new Photo_1.default(req.body);
        const file = req.file.buffer;
        photo.photo = file;
        console.log("got photo");
        yield photo.save();
        res.status(201).send({ _id: photo._id });
    }
    catch (error) {
        res.status(500).send({
            upload_error: "Error while uploading file...Try again later.",
        });
    }
}), (error, req, res, next) => {
    if (error) {
        res.status(500).send({
            upload_error: error.message,
        });
    }
});
Router.get("/photos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const photos = yield Photo_1.default.find({});
        res.send(photos);
        console.log("get photos");
    }
    catch (error) {
        res.status(500).send({ get_error: "Error while getting list of photos." });
    }
}));
Router.get("/photos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Photo_1.default.findById(req.params.id);
        res.set("Content-Type", "image/jpeg");
        res.send(result.photo);
    }
    catch (error) {
        res.status(400).send({ get_error: "Error while getting photo." });
    }
}));
exports.default = Router;
//# sourceMappingURL=photos.js.map