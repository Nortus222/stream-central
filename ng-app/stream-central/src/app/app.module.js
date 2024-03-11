"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const pagination_1 = require("ngx-bootstrap/pagination");
const forms_1 = require("@angular/forms");
const app_routing_module_1 = require("./app-routing.module");
const app_component_1 = require("./app.component");
const home_component_1 = require("./home/home.component");
const content_details_component_1 = require("./content-details/content-details.component");
const favorites_component_1 = require("./favorites/favorites.component");
const contentproxy_service_1 = require("./contentproxy.service");
const http_1 = require("@angular/common/http");
const auth_service_1 = require("./auth.service");
const tvshows_component_1 = require("./tvshows/tvshows.component");
const movies_component_1 = require("./movies/movies.component");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, core_1.NgModule)({
        declarations: [
            app_component_1.AppComponent,
            home_component_1.HomeComponent,
            content_details_component_1.ContentDetailsComponent,
            favorites_component_1.FavoritesComponent,
            tvshows_component_1.TvshowsComponent,
            movies_component_1.MoviesComponent
        ],
        imports: [
            pagination_1.PaginationModule.forRoot(),
            forms_1.FormsModule,
            platform_browser_1.BrowserModule,
            app_routing_module_1.AppRoutingModule,
            http_1.HttpClientModule,
        ],
        providers: [contentproxy_service_1.ContentproxyService, auth_service_1.AuthService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map