export interface LoggerArgs {
    quiet: boolean;
}
export declare class Logger {
    quiet: boolean;
    forceLogger: Logger;
    stdout: Function;
    stderr: Function;
    constructor(args: LoggerArgs);
    force(): Logger;
    println(msg: string[]): void;
    eprintln(msg: string[]): void;
}
