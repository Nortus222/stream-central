"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesComponent = void 0;
const core_1 = require("@angular/core");
let MoviesComponent = class MoviesComponent {
    constructor(route, content$) {
        this.route = route;
        this.content$ = content$;
        this.results = [];
        this.content$.getMovies().subscribe((res) => {
            this.results = res;
            console.log(res);
        });
    }
};
MoviesComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-movies',
        templateUrl: './movies.component.html',
        styleUrl: './movies.component.css'
    })
], MoviesComponent);
exports.MoviesComponent = MoviesComponent;
//# sourceMappingURL=movies.component.js.map