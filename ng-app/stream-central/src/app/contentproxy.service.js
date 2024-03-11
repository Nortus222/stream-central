"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentproxyService = void 0;
const core_1 = require("@angular/core");
let ContentproxyService = class ContentproxyService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.hostUrl = 'http://localhost:8080';
    }
    getMovieById(movieId) {
        return this.httpClient.get(this.hostUrl + '/movies/' + movieId);
    }
    getMovies() {
        return this.httpClient.get(this.hostUrl + '/movies');
    }
    getFavorites(userId) {
        return this.httpClient.get(this.hostUrl + '/favorites/' + userId);
    }
    getTVShows() {
        return this.httpClient.get(this.hostUrl + '/tvshows');
    }
    getTVShowById(tvshowId) {
        return this.httpClient.get(this.hostUrl + '/tvshows/' + tvshowId);
    }
    addToFavorites(userId, contentId) {
        return this.httpClient.post(this.hostUrl + '/favorites/' + userId + '/' + contentId, {});
    }
    removeFromFavorites(userId, contentId) {
        return this.httpClient.delete(this.hostUrl + '/favorites/' + userId + '/' + contentId, {});
    }
    getContentById(contentId) {
        return this.httpClient.get(this.hostUrl + '/movies/' + contentId);
    } //might fix this later
    getAllContent() {
        return this.httpClient.get(this.hostUrl + '/movies');
    }
};
ContentproxyService = __decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    })
], ContentproxyService);
exports.ContentproxyService = ContentproxyService;
//# sourceMappingURL=contentproxy.service.js.map