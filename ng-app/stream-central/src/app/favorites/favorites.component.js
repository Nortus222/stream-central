"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesComponent = void 0;
const core_1 = require("@angular/core");
let FavoritesComponent = class FavoritesComponent {
    constructor(router, contentService) {
        this.router = router;
        this.contentService = contentService;
        this.contentIds = [];
        this.favorites = [];
        this.contentService.getFavorites("2").subscribe((res) => {
            this.contentIds = res;
            console.log(res);
            this.getContentsByIds();
        });
    }
    removeFromFavorites(contentId) {
        this.contentService.removeFromFavorites('2', contentId).subscribe((res) => {
            console.log(res);
        });
    }
    getContentsByIds() {
        for (const movieId of this.contentIds.movies)
            this.contentService.getMovieById(movieId).subscribe((movie) => {
                console.log(movieId);
                this.favorites.push(movie);
                console.log(this.favorites);
            });
    }
};
FavoritesComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-favorites',
        templateUrl: './favorites.component.html',
        styleUrl: './favorites.component.css'
    })
], FavoritesComponent);
exports.FavoritesComponent = FavoritesComponent;
//# sourceMappingURL=favorites.component.js.map