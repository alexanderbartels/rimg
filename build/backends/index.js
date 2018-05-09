"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Backend = /** @class */ (function () {
    function Backend() {
        this.supportedCommands = [];
        this.commandExecutors = {};
    }
    Backend.prototype.registerCommandExecutor = function (command, executor) {
        // if an executor is provieded, the command will be supported
        if (this.supportedCommands.indexOf(command) === -1)
            this.supportedCommands.push(command);
        this.commandExecutors[command] = executor;
    };
    // commands which can be processed by the backend
    Backend.prototype.getSupportedCommands = function () {
        return this.supportedCommands;
    };
    // checks if a backend supports a given command
    Backend.prototype.hasSupport = function (command) {
        return this.getSupportedCommands().indexOf(command) !== -1;
    };
    // the executor that does the processing
    Backend.prototype.createCommandExecutor = function (command, logger, args) {
        return this.commandExecutors[command].init(args);
    };
    return Backend;
}());
exports.Backend = Backend;
var Backends = /** @class */ (function () {
    function Backends() {
        this.registry = {};
    }
    Backends.prototype.registerBackend = function (backend) {
        if (this.registry[backend.getName()]) {
            throw "Backend with name " + backend.getName() + " is already registered.";
        }
        this.registry[backend.getName()] = backend;
    };
    /**
     *
     * @param command
     * @ return array with backend names, that support the given command
     */
    Backends.prototype.getSupportedBackends = function (command) {
        var _this = this;
        return Object.keys(this.registry).filter(function (backend) {
            return _this.registry[backend].hasSupport(command);
        });
    };
    Backends.prototype.getBackendsByNames = function (names) {
        var _this = this;
        return Object.keys(this.registry)
            .filter(function (k) { return names.indexOf(k) !== -1; })
            .map(function (k) { return _this.registry[k]; });
    };
    Backends.prototype.getBackendByName = function (name) {
        return this.registry[name];
    };
    Backends.prototype.generateOptions = function (backends) {
        var _this = this;
        var opts = {};
        backends.forEach(function (backendName) {
            var backend = _this.getBackendByName(backendName);
            if (backend) {
                opts = __assign({}, opts, backend.getOptions());
            }
        });
        return opts;
    };
    return Backends;
}());
exports.Backends = Backends;
//# sourceMappingURL=index.js.map