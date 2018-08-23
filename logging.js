'use: strict';
const winston = require('winston');
const moment = require('moment');
const tsFormat = () => getPrettyDt();
const logDir = 'logs';

function getPrettyDt() {
    if (moment) {
        return moment().format('M-D-YYYY - h:mm:ssa');
    }
}

// This initializes the winston logging instance
const logger = new(winston.Logger)({
    levels: {
        trace: 0,
        input: 1,
        verbose: 2,
        prompt: 3,
        debug: 4,
        info: 5,
        data: 6,
        help: 7,
        warn: 8,
        error: 9
    },
    colors: {
        trace: 'magenta',
        input: 'grey',
        verbose: 'cyan',
        prompt: 'grey',
        debug: 'yellow',
        info: 'green',
        data: 'blue',
        help: 'cyan',
        warn: 'orange',
        error: 'red'
    },
    transports: [
        new(winston.transports.Console)({
            levels: 'trace',
            colorize: true,
            prettyPrint: true,
            timestamp: tsFormat
        }),
        new(require('winston-daily-rotate-file'))({
            filename: logDir + '/NST_Streaming_Service-%DATE%.log',
            levels: 'trace',
            colorize: false,
            prettyPrint: true,
            timestamp: tsFormat,
            json: false,
            localTime: true,
            datePattern: 'MM-DD-YYYY',
            maxFiles: 20,
            prepend: true
        })
    ],
    exitOnError: false
});

module.exports = logger;