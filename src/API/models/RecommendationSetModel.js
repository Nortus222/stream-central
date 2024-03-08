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
exports.ReccomendationSetModel = void 0;
var Mongoose = require("mongoose");
var ReccomendationSetModel = /** @class */ (function () {
    function ReccomendationSetModel(DB_CONNECTION_STRING) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }
    ReccomendationSetModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            id: String,
            userId: String,
            recommendedMovies: [String],
        }, { collection: "recommendationSets" });
    };
    ReccomendationSetModel.prototype.createModel = function () {
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
                        this.model = Mongoose.model("recommendationSets", this.schema);
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
    ReccomendationSetModel.prototype.getAllMoviesInRecommendationSet = function (response, recommendationSetId) {
        return __awaiter(this, void 0, void 0, function () {
            var query, recSet, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.model.findOne({ recommendationSetId: recommendationSetId });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, query.exec()];
                    case 2:
                        recSet = _a.sent();
                        if (recSet) {
                            response.status(200).json(recSet.movies);
                        }
                        else {
                            response.status(404).send();
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        response.status(500).send();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ReccomendationSetModel.prototype.getNumberMoviesInRecommendationSet = function (response, recommendationSetId) {
        return __awaiter(this, void 0, void 0, function () {
            var query, recSet, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.model.findOne({ recommendationSetId: recommendationSetId });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, query.exec()];
                    case 2:
                        recSet = _a.sent();
                        if (recSet) {
                            response.status(200).json({ numberOfMovies: recSet.movies.length });
                        }
                        else {
                            response.status(404).send();
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        response.status(500).send();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ReccomendationSetModel.prototype.addMovieToRecommendationSet = function (response, recommendationSetId, movieId, movieTitle) {
        return __awaiter(this, void 0, void 0, function () {
            var query, recSet, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.model.findOne({ recommendationSetId: recommendationSetId });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, query.exec()];
                    case 2:
                        recSet = _a.sent();
                        if (!recSet) return [3 /*break*/, 4];
                        recSet.movies.push({ movieId: movieId, movieTitle: movieTitle });
                        return [4 /*yield*/, recSet.save()];
                    case 3:
                        _a.sent();
                        response.status(200).send();
                        return [3 /*break*/, 5];
                    case 4:
                        response.status(404).send();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_3 = _a.sent();
                        response.status(500).send();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ReccomendationSetModel.prototype.removeMovieFromRecommendationSet = function (response, recommendationSetId, movieId) {
        return __awaiter(this, void 0, void 0, function () {
            var query, recSet, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.model.findOne({ recommendationSetId: recommendationSetId });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, query.exec()];
                    case 2:
                        recSet = _a.sent();
                        if (!recSet) return [3 /*break*/, 4];
                        recSet.movies = recSet.movies.filter(function (movie) { return movie.movieId !== movieId; });
                        return [4 /*yield*/, recSet.save()];
                    case 3:
                        _a.sent();
                        response.status(200).send();
                        return [3 /*break*/, 5];
                    case 4:
                        response.status(404).send();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_4 = _a.sent();
                        response.status(500).send();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ReccomendationSetModel.prototype.deleteRecommendationSet = function (response, recommendationSetId) {
        return __awaiter(this, void 0, void 0, function () {
            var query, recSet, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.model.findOne({ recommendationSetId: recommendationSetId });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, query.exec()];
                    case 2:
                        recSet = _a.sent();
                        if (!recSet) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.model.deleteOne({ recommendationSetId: recommendationSetId })];
                    case 3:
                        _a.sent();
                        response.status(200).send();
                        return [3 /*break*/, 5];
                    case 4:
                        response.status(404).send();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_5 = _a.sent();
                        response.status(500).send();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return ReccomendationSetModel;
}());
exports.ReccomendationSetModel = ReccomendationSetModel;
