"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentDetailsComponent = void 0;
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const contentproxy_service_1 = require("../contentproxy.service");
let ContentDetailsComponent = class ContentDetailsComponent {
    constructor() {
        this.route = (0, core_1.inject)(router_1.ActivatedRoute);
        this.contentService = (0, core_1.inject)(contentproxy_service_1.ContentproxyService);
        const contentId = this.route.snapshot.params['id'];
        console.log('Content ID from route:', contentId);
        this.contentService.getContentById(contentId).subscribe((res) => {
            this.content = res;
            console.log(res);
        });
    }
    addToFavorites(contentId) {
        this.contentService.addToFavorites('2', contentId).subscribe((res) => {
            console.log(res);
        });
    }
};
ContentDetailsComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-content-details',
        templateUrl: './content-details.component.html',
        styleUrl: './content-details.component.css'
    })
], ContentDetailsComponent);
exports.ContentDetailsComponent = ContentDetailsComponent;
//# sourceMappingURL=content-details.component.js.map