webpackJsonp([1,5],{

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(29);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = (function () {
    function LoginComponent(_authService, _router) {
        this._authService = _authService;
        this._router = _router;
        this.pageTitle = "Login Page";
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.authenticate = function (formValues) {
        this.credentials = {
            email: formValues.email,
            password: formValues.password
        };
        this._authService.authenticate(this.credentials);
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-login',
        template: __webpack_require__(313),
        styles: [__webpack_require__(299)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _b || Object])
], LoginComponent);

;
var _a, _b;
//# sourceMappingURL=/home/rensvanw/Development/QNH.ADZ.Stagiairs.SecurityPOC/angular-frontend/src/login.component.js.map

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(29);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProfileComponent = (function () {
    function ProfileComponent(_authService, _router) {
        this._authService = _authService;
        this._router = _router;
        this.pageTitle = "Profile Page";
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var fullName = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* FormControl */](this._authService.currentUser.fullName, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required);
        this.profileForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* FormGroup */]({
            fullName: fullName,
        });
    };
    ProfileComponent.prototype.goBack = function () {
        this._router.navigate(['home']);
    };
    ProfileComponent.prototype.saveProfile = function (formValues) {
        if (this.profileForm.valid) {
            this._authService.updateCurrentUser(formValues.fullName);
            this._router.navigate(['home']);
        }
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-profile',
        template: __webpack_require__(314),
        styles: [__webpack_require__(300)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === "function" && _b || Object])
], ProfileComponent);

var _a, _b;
//# sourceMappingURL=/home/rensvanw/Development/QNH.ADZ.Stagiairs.SecurityPOC/angular-frontend/src/profile.component.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SignupComponent = (function () {
    function SignupComponent(_router, _authService, _formBuilder) {
        this._router = _router;
        this._authService = _authService;
        this._formBuilder = _formBuilder;
        this.pageTitle = 'Create new account';
        this.showError = false;
        this.showSpinner = false;
    }
    SignupComponent.prototype.ngOnInit = function () {
        this.userForm = this._formBuilder.group({
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].minLength(5)])],
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].required],
            fullName: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].required],
            countryCode: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].required],
            mobilePhoneNumber: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].required]
        });
    };
    SignupComponent.prototype.createUser = function (formValues) {
        var _this = this;
        if (this.userForm.valid) {
            this.toggleSpinner();
            this._authService.createUser(formValues).subscribe(function (userExists) {
                !userExists.email ? _this.showError = true : _this._router.navigate(['users']);
            }, function (err) { return console.log(err); }, function () { return _this.toggleSpinner(); });
        }
    };
    SignupComponent.prototype.toggleSpinner = function () {
        return this.showSpinner = !this.showSpinner;
    };
    SignupComponent.prototype.goBack = function () {
        this._router.navigate(['login']);
    };
    return SignupComponent;
}());
SignupComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-signup',
        template: __webpack_require__(315),
        styles: [__webpack_require__(301)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__auth_service__["a" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormBuilder */]) === "function" && _c || Object])
], SignupComponent);

var _a, _b, _c;
//# sourceMappingURL=/home/rensvanw/Development/QNH.ADZ.Stagiairs.SecurityPOC/angular-frontend/src/signup.component.js.map

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_auth_service__ = __webpack_require__(31);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = (function () {
    function HomeComponent(_authService) {
        this._authService = _authService;
        this.pageTitle = 'Welcome';
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.fullName = this._authService.currentUser.fullName;
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-home',
        template: __webpack_require__(317),
        styles: [__webpack_require__(303)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__auth_auth_service__["a" /* AuthService */]) === "function" && _a || Object])
], HomeComponent);

var _a;
//# sourceMappingURL=/home/rensvanw/Development/QNH.ADZ.Stagiairs.SecurityPOC/angular-frontend/src/home.component.js.map

/***/ }),

/***/ 219:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 219;


/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(236);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/home/rensvanw/Development/QNH.ADZ.Stagiairs.SecurityPOC/angular-frontend/src/main.js.map

/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_guard_service__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home_component__ = __webpack_require__(160);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forRoot([
                { path: 'home', canActivate: [__WEBPACK_IMPORTED_MODULE_2__auth_auth_guard_service__["a" /* AuthGuard */]], component: __WEBPACK_IMPORTED_MODULE_3__home_home_component__["a" /* HomeComponent */] },
                { path: '', redirectTo: 'home', pathMatch: 'full' },
                { path: '**', redirectTo: 'home', pathMatch: 'full' }
            ], { useHash: true })],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]],
    })
], AppRoutingModule);

//# sourceMappingURL=/home/rensvanw/Development/QNH.ADZ.Stagiairs.SecurityPOC/angular-frontend/src/app-routing.module.js.map

/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'SecurityPoC';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(312),
        styles: [__webpack_require__(298)]
    })
], AppComponent);

//# sourceMappingURL=/home/rensvanw/Development/QNH.ADZ.Stagiairs.SecurityPOC/angular-frontend/src/app.component.js.map

/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_routing_module__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_auth_module__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__nav_bar_nav_bar_component__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ng_bootstrap_ng_bootstrap__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__home_home_component__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__footer_footer_component__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__auth_auth_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__auth_auth_guard_service__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__emitter_service__ = __webpack_require__(239);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












//import { AuthModule } from './auth.module';

var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_6__nav_bar_nav_bar_component__["a" /* NavBarComponent */],
            __WEBPACK_IMPORTED_MODULE_8__home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_9__footer_footer_component__["a" /* FooterComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["HttpModule"],
            __WEBPACK_IMPORTED_MODULE_7__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_4__auth_auth_module__["a" /* AuthModule */],
            __WEBPACK_IMPORTED_MODULE_3__app_routing_module__["a" /* AppRoutingModule */],
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_10__auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_11__auth_auth_guard_service__["a" /* AuthGuard */], __WEBPACK_IMPORTED_MODULE_12__emitter_service__["a" /* EmitterService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=/home/rensvanw/Development/QNH.ADZ.Stagiairs.SecurityPOC/angular-frontend/src/app.module.js.map

/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_guard_service__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login_component__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__profile_profile_component__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__signup_signup_component__ = __webpack_require__(159);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var AuthRoutingModule = (function () {
    function AuthRoutingModule() {
    }
    return AuthRoutingModule;
}());
AuthRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forChild([
                { path: 'signup', component: __WEBPACK_IMPORTED_MODULE_5__signup_signup_component__["a" /* SignupComponent */] },
                { path: 'profile', canActivate: [__WEBPACK_IMPORTED_MODULE_2__auth_guard_service__["a" /* AuthGuard */]], component: __WEBPACK_IMPORTED_MODULE_4__profile_profile_component__["a" /* ProfileComponent */] },
                { path: 'login', component: __WEBPACK_IMPORTED_MODULE_3__login_login_component__["a" /* LoginComponent */] },
            ])],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]],
        providers: [__WEBPACK_IMPORTED_MODULE_2__auth_guard_service__["a" /* AuthGuard */]]
    })
], AuthRoutingModule);

//# sourceMappingURL=/home/rensvanw/Development/QNH.ADZ.Stagiairs.SecurityPOC/angular-frontend/src/auth-routing.module.js.map

/***/ }),

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_jwt__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth_routing_module__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login_component__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__profile_profile_component__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__signup_signup_component__ = __webpack_require__(159);
/* unused harmony export authHttpServiceFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









function authHttpServiceFactory(http, options) {
    return new __WEBPACK_IMPORTED_MODULE_2_angular2_jwt__["AuthHttp"](new __WEBPACK_IMPORTED_MODULE_2_angular2_jwt__["AuthConfig"]({ tokenName: 'token',
        tokenGetter: (function () { return sessionStorage.getItem('token'); }),
        globalHeaders: [{ 'Content-Type': 'application/json' }],
        noJwtError: true
    }), http, options);
}
var AuthModule = (function () {
    function AuthModule() {
    }
    return AuthModule;
}());
AuthModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        providers: [
            {
                provide: __WEBPACK_IMPORTED_MODULE_2_angular2_jwt__["AuthHttp"],
                useFactory: authHttpServiceFactory,
                deps: [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]]
            }
        ],
        imports: [__WEBPACK_IMPORTED_MODULE_5__auth_routing_module__["a" /* AuthRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common__["i" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* ReactiveFormsModule */]],
        exports: [],
        declarations: [__WEBPACK_IMPORTED_MODULE_6__login_login_component__["a" /* LoginComponent */], __WEBPACK_IMPORTED_MODULE_7__profile_profile_component__["a" /* ProfileComponent */], __WEBPACK_IMPORTED_MODULE_8__signup_signup_component__["a" /* SignupComponent */]]
    })
], AuthModule);

//# sourceMappingURL=/home/rensvanw/Development/QNH.ADZ.Stagiairs.SecurityPOC/angular-frontend/src/auth.module.js.map

/***/ }),

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmitterService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* * * ./app/emitter.service.ts * * */
// Credit to https://gist.github.com/sasxa
// Imports

var EmitterService = (function () {
    function EmitterService() {
    }
    // Set a new event in the store with a given ID
    // as key
    EmitterService.get = function (ID) {
        if (!this._emitters[ID]) {
            this._emitters[ID] = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        }
        return this._emitters[ID];
    };
    return EmitterService;
}());
// Event store
EmitterService._emitters = {};
EmitterService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], EmitterService);

//# sourceMappingURL=/home/rensvanw/Development/QNH.ADZ.Stagiairs.SecurityPOC/angular-frontend/src/emitter.service.js.map

/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = (function () {
    function FooterComponent() {
        this.footerText = 'footer';
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    return FooterComponent;
}());
FooterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-footer',
        template: __webpack_require__(316),
        styles: [__webpack_require__(302)]
    }),
    __metadata("design:paramtypes", [])
], FooterComponent);

//# sourceMappingURL=/home/rensvanw/Development/QNH.ADZ.Stagiairs.SecurityPOC/angular-frontend/src/footer.component.js.map

/***/ }),

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_auth_service__ = __webpack_require__(31);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavBarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NavBarComponent = (function () {
    function NavBarComponent(_authService) {
        this._authService = _authService;
        this.pageTitle = 'SecurityPoC';
    }
    NavBarComponent.prototype.ngOnInit = function () {
    };
    return NavBarComponent;
}());
NavBarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-nav-bar',
        template: __webpack_require__(318),
        styles: [__webpack_require__(304)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__auth_auth_service__["a" /* AuthService */]) === "function" && _a || Object])
], NavBarComponent);

var _a;
//# sourceMappingURL=/home/rensvanw/Development/QNH.ADZ.Stagiairs.SecurityPOC/angular-frontend/src/nav-bar.component.js.map

/***/ }),

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=/home/rensvanw/Development/QNH.ADZ.Stagiairs.SecurityPOC/angular-frontend/src/environment.js.map

/***/ }),

/***/ 298:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 299:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)();
// imports


// module
exports.push([module.i, ".card {\r\n    margin-top: 25px;\r\n}\r\n\r\n.pull-right {\r\n  float: right;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 300:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)();
// imports


// module
exports.push([module.i, ".card {\r\n    margin-top: 25px;\r\n}\r\n\r\n.pull-right {\r\n  float: right;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 301:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)();
// imports


// module
exports.push([module.i, ".card {\r\n    margin-top: 25px;\r\n}\r\n\r\n.pull-right {\r\n  float: right;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 302:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)();
// imports


// module
exports.push([module.i, "/*\r\nnav {\r\n  position: absolute;\r\n  bottom: 0;\r\n  width: 100%;\r\n\r\n  height: 60px;\r\n  background-color: #f5f5f5;\r\n}\r\n\r\n\r\n/* Custom page CSS\r\n-------------------------------------------------- */\r\n/* Not required for template or sticky footer method. */\r\n\r\n\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 303:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)();
// imports


// module
exports.push([module.i, ".card {\r\n    margin-top:25px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 304:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_do__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AuthService = (function () {
    function AuthService(_http, _router) {
        this._http = _http;
        this._router = _router;
        this._authenticateUrl = '/api/login';
        this._signupUrl = '/api/signup';
    }
    AuthService.prototype.authenticate = function (credentials) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers }); // Create a request option
        return this._http.post(this._authenticateUrl, credentials)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            localStorage.setItem('token', data.token);
            _this.currentUser = data.respond.user;
        }, function (error) { return console.log(error); }, function () {
            console.log('Welcome', _this.currentUser.fullName + '!');
            _this._router.navigate(['home']);
        });
    };
    AuthService.prototype.createUser = function (user) {
        return this._http.post(this._signupUrl, user) // ...using post request
            .map(function (res) { return res.json(); }) // ...and calling .json() on the response to return data
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); }); //...errors if
    };
    AuthService.prototype.handleError = function (error) {
        console.error(error);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error');
    };
    AuthService.prototype.isAuthenticated = function () {
        return !!localStorage.getItem('token');
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem('token');
        this.currentUser = null;
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__["tokenNotExpired"])();
    };
    AuthService.prototype.updateCurrentUser = function (fullName) {
        this.currentUser.fullName = fullName;
    };
    return AuthService;
}());
AuthService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */]) === "function" && _b || Object])
], AuthService);

var _a, _b;
//# sourceMappingURL=/home/rensvanw/Development/QNH.ADZ.Stagiairs.SecurityPOC/angular-frontend/src/auth.service.js.map

/***/ }),

/***/ 312:
/***/ (function(module, exports) {

module.exports = "\r\n<app-nav-bar></app-nav-bar>\r\n<div class='container'>\r\n            <router-outlet></router-outlet>\r\n        </div>\r\n\r\n\r\n"

/***/ }),

/***/ 313:
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\r\n  <h3 class=\"card-header\">{{pageTitle}}</h3>\r\n  <div class=\"card-block\">\r\n\r\n   <form #loginForm=\"ngForm\" (ngSubmit)=\"authenticate(loginForm.value)\" autocomplete=\"off\" novalidate>\r\n    <div class=\"form-group\">\r\n      <label for=\"userName\">Email</label>\r\n      <input required (ngModel)=\"email\" name=\"email\" id=\"email\" type=\"text\" class=\"form-control\" placeholder=\"Email\" />\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label for=\"password\">Password</label>\r\n      <input required (ngModel)=\"password\" name=\"password\" id=\"password\" type=\"password\" class=\"form-control\" placeholder=\"password\" />\r\n    </div>\r\n    <button type=\"submit\" [disabled]=\"loginForm.invalid\" class=\"btn btn-primary pull-right\">Login</button>\r\n      </form>\r\n\r\n  </div>\r\n   <div style=\"align-self: center\"><a [routerLink]=\"['/signup']\" routerLinkActive=\"active\">Don't have an account yet? Click here to register!</a></div>\r\n\r\n</div>\r\n"

/***/ }),

/***/ 314:
/***/ (function(module, exports) {

module.exports = " <div class=\"card\">\r\n  <h3 class=\"card-header\">{{pageTitle}}</h3>\r\n  <div class=\"card-block\">\r\n    \r\n  <form [formGroup]=\"profileForm\" (ngSubmit)=\"saveProfile(profileForm.value)\" autocomplete=\"off\" novalidate>\r\n    <div class=\"form-group\">\r\n      <label for=\"firstName\">Full Name</label>\r\n      <input formControlName=\"fullName\" id=\"fullName\" type=\"text\" class=\"form-control\" placeholder=\"Full name\" />\r\n    </div>\r\n    \r\n   \r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"goBack()\">Cancel</button>\r\n     <button type=\"submit\" class=\"btn btn-primary pull-right\">Save</button>\r\n      </form>\r\n      \r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ 315:
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\n  <h3 class=\"card-header\">{{pageTitle}}</h3>\n  <div class=\"card-block\">\n   \n    \n    <form [formGroup]=\"userForm\" (ngSubmit)=\"createUser(userForm.value)\">\n\n       <div class=\"form-group\">\n         <div *ngIf='showError' class=\"alert alert-danger\" role=\"alert\">\n  <strong>Oh snap!</strong> Email Already Exists!\n        </div>\n        <label>Email:</label>\n        <input class=\"form-control\" type=\"text\" placeholder=\"Email\" [formControl]=\"userForm.controls['email']\" >\n\n      </div>\n       \n      <div class=\"form-group\">\n        <label>Full Name:</label>\n        <input class=\"form-control\" type=\"text\" placeholder=\"Full name\" [formControl]=\"userForm.controls['fullName']\">\n      </div>\n\n       <div class=\"form-group\" >\n        <label>Password:</label>\n        <input class=\"form-control\" type=\"text\" placeholder=\"Password\" [formControl]=\"userForm.controls['password']\" >\n\n        \n      </div>\n          <div class=\"form-group\" >\n        <label>Country Code:</label>\n        <input class=\"form-control\" type=\"text\" placeholder=\"Country code\" [formControl]=\"userForm.controls['countryCode']\">\n      </div>\n\n      <div class=\"form-group\" >\n        <label>Mobile Phone Number:</label>\n        <input class=\"form-control\" type=\"text\" placeholder=\"Mobile phone number\" [formControl]=\"userForm.controls['mobilePhoneNumber']\">\n      </div>\n      <button type=\"button\" class=\"btn btn-primary\" (click)=\"goBack()\">Back</button>\n      <button type=\"submit\" [disabled]=\"userForm.invalid\" class=\"btn btn-primary pull-right\"><i *ngIf='showSpinner'class=\"fa fa-spinner fa-spin\"></i> Save</button>\n      </form>\n      \n      \n  </div>\n</div>\n\n\n"

/***/ }),

/***/ 316:
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-toggleable-md navbar-inverse bg-primary\" style=\"color: white\">\r\n {{footerText}}\r\n</nav>"

/***/ }),

/***/ 317:
/***/ (function(module, exports) {

module.exports = "<div class=\"card \">\r\n  <h3 class=\"card-header\">\r\n    {{pageTitle}}\r\n  </h3>\r\n  <div class=\"card-block\">\r\n    <div class=\"card-title\" *ngIf=\"fullName\">Welcome {{fullName}}</div>\r\n   \r\n\r\n  </div>\r\n</div>\r\n\r\n"

/***/ }),

/***/ 318:
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-toggleable-md navbar-inverse bg-primary\">\r\n  <button class=\"navbar-toggler navbar-toggler-right\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNavDropdown\" aria-controls=\"navbarNavDropdown\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n    <span class=\"navbar-toggler-icon\"></span>\r\n  </button>\r\n  <a class=\"navbar-brand\" href=\"#\">{{pageTitle}}</a>\r\n  <div class=\"collapse navbar-collapse\" id=\"navbarNavDropdown\">\r\n    <ul class=\"navbar-nav mr-auto\">\r\n      <li class=\"nav-item\">\r\n        <a class= \"nav-link\" [routerLink]=\"['/home']\" routerLinkActive=\"active\">Home</a>\r\n      </li>\r\n     \r\n     \r\n    </ul>\r\n    <ul class=\"navbar-nav\">\r\n       <li class=\"nav-item\">\r\n        <a class= \"nav-link\" *ngIf=\"!_authService.isAuthenticated()\" [routerLink]=\"['login']\" routerLinkActive=\"active\">Login</a>\r\n        \r\n        <a class= \"nav-link\" *ngIf=\"_authService.isAuthenticated()\" [routerLink]=\"['profile']\" routerLinkActive=\"active\">Profile</a>\r\n      </li>\r\n      <li class=\"nav-item\">\r\n        <a (click)=\"_authService.logout()\" class= \"nav-link\" *ngIf=\"_authService.isAuthenticated()\" [routerLink]=\"['login']\" routerLinkActive=\"active\">Logout</a>\r\n        \r\n      </li>\r\n      </ul>\r\n  </div>\r\n</nav>\r\n"

/***/ }),

/***/ 577:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(220);


/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(31);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
    function AuthGuard(_router, _authService) {
        this._router = _router;
        this._authService = _authService;
    }
    AuthGuard.prototype.canActivate = function () {
        if (this._authService.isAuthenticated()) {
            return true;
        }
        else {
            this._router.navigate(['login']);
            return false;
        }
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === "function" && _b || Object])
], AuthGuard);

var _a, _b;
//# sourceMappingURL=/home/rensvanw/Development/QNH.ADZ.Stagiairs.SecurityPOC/angular-frontend/src/auth-guard.service.js.map

/***/ })

},[577]);
//# sourceMappingURL=main.bundle.js.map