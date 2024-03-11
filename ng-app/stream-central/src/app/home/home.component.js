"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeComponent = void 0;
const core_1 = require("@angular/core");
let HomeComponent = class HomeComponent {
    constructor(route, content$) {
        this.route = route;
        this.content$ = content$;
        this.page = 1;
        this.pageSize = 15;
        this.pagedItems = [];
        this.contents = [];
        this.filteredContents = [];
        this.content$.getAllContent().subscribe((res) => {
            this.contents = res;
            this.filteredContents = res;
            this.setPage(this.page);
            console.log(res);
        });
    }
    addToFavorites(contentId) {
        this.content$.addToFavorites('2', contentId).subscribe((res) => {
            console.log(res);
        });
    }
    setPage(pageNo) {
        this.page = pageNo;
        const start = (this.page - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.pagedItems = this.filteredContents.slice(start, end);
    }
    filterResults(searchTerm) {
        if (!searchTerm)
            this.filteredContents = this.contents;
        this.filteredContents = this.contents.filter((contents) => {
            return contents.title.toLowerCase().includes(searchTerm.toLowerCase());
        });
        this.page = 1;
        this.setPage(this.page);
    }
    filterByType(contentType) {
        if (!contentType)
            this.filteredContents = this.contents;
        else {
            this.filteredContents = this.contents.filter((content) => {
                return content.type.toLowerCase().includes(contentType.toLowerCase());
            });
        }
        this.page = 1;
        this.setPage(this.page);
    }
    filterByGenre(genre) {
        if (!genre)
            this.filteredContents = this.contents;
        else {
            this.filteredContents = this.contents.filter((content) => {
                return content.genre.toLowerCase().includes(genre.toLowerCase());
            });
        }
        this.page = 1;
        this.setPage(this.page);
    }
};
HomeComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrl: './home.component.css'
    })
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map