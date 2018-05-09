"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Logger = /** @class */ (function () {
    function Logger(args) {
        this.quiet = args.quiet;
        this.forceLogger = this;
        if (this.quiet)
            this.forceLogger = new Logger({ quiet: false });
        this.stdout = console.log;
        this.stderr = console.error;
    }
    Logger.prototype.force = function () {
        // force Logger only needed if quiet is true
        // so we have a nice api. e.g. this.logger.force().println();
        return this.quiet ?
            this.forceLogger : this;
    };
    Logger.prototype.println = function (msg) {
        if (this.quiet)
            return;
        this.stdout.apply(console, msg);
    };
    Logger.prototype.eprintln = function (msg) {
        if (this.quiet)
            return;
        this.stderr.apply(console, ["Error: "].concat(msg));
    };
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map