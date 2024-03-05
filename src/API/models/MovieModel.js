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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieModel = void 0;
var Mongoose = require("mongoose");
var MovieModel = /** @class */ (function () {
    function MovieModel(DB_CONNECTION_STRING) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }
    MovieModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            tmdb_id: { type: Number, required: true },
            budget: Number,
            genres: [
                {
                    id: Number,
                    name: String
                }
            ],
            imdb_id: String,
            original_language: String,
            original_title: String,
            overview: String,
            popularity: Number,
            poster_path: String,
            production_countries: [
                {
                    iso_3166_1: String,
                    name: String
                }
            ],
            release_date: String,
            revenue: Number,
            runtime: Number,
            spoken_languages: [
                {
                    english_name: String,
                    iso_639_1: String,
                    name: String
                }
            ],
            status: String,
            tagline: String,
            title: String,
            vote_average: Number,
            vote_count: Number,
            casts: {
                cast: [
                    {
                        gender: Number,
                        id: Number,
                        name: String,
                        profile_path: String,
                        character: String,
                        order: Number
                    }
                ],
            },
            keywords: {
                keywords: [
                    {
                        id: Number,
                        name: String
                    }
                ]
            },
            ratings: [
                {
                    source: String,
                    value: Number,
                    score: Number,
                    votes: Number,
                    popular: Number
                }
            ],
            streams: [
                {
                    id: Number,
                    name: String,
                }
            ],
            watch_providers: [
                {
                    id: Number,
                    name: String,
                }
            ],
            trailer: String,
            poster: String,
            backdrop: String,
            streamingInfo: [
                {
                    service: String,
                    streamingType: String,
                    quality: String,
                    link: String,
                    videoLink: String,
                    leaving: Number,
                    availableSince: Number,
                }
            ]
        }, { collection: "movies" });
    };
    MovieModel.prototype.createModel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Mongoose.connect(this.dbConnectionString, {
                                useNewUrlParser: true,
                                useUnifiedTopology: true
                            })];
                    case 1:
                        _a.sent();
                        this.model = Mongoose.model("movies", this.schema);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MovieModel.prototype.retrieveAllMovies = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            var query, items, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.model.find({});
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, query.exec()];
                    case 2:
                        items = _a.sent();
                        response.json(items);
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        console.error(e_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MovieModel.prototype.retrieveMovieById = function (response, movieId) {
        return __awaiter(this, void 0, void 0, function () {
            var movieIdNumber, query, item, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        movieIdNumber = Number(movieId);
                        query = this.model.findOne({ tmdb_id: movieIdNumber });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, query.exec()];
                    case 2:
                        item = _a.sent();
                        response.json(item);
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        console.error(e_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MovieModel.prototype.retrieveMovieCount = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            var query, numberOfItems, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.model.estimatedDocumentCount();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, query.exec()];
                    case 2:
                        numberOfItems = _a.sent();
                        response.json(numberOfItems);
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        console.error(e_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return MovieModel;
}());
exports.MovieModel = MovieModel;
