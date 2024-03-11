"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const core_1 = require("@angular/core");
let AuthService = class AuthService {
    constructor() {
        this.isLoggedIn = false;
    }
    login(username, password) {
        if (username === 'user' && password === 'password') {
            this.isLoggedIn = true;
        }
    }
    signup(username, password, email) {
        // logic to create a new user
    }
    logout() {
        this.isLoggedIn = false;
    }
};
AuthService = __decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    })
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map