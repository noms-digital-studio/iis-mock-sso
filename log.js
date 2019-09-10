'use strict';

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, colorize, prettyPrint, json, printf } = format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} - ${level}: ${message}`;
});
const logger = createLogger({
    format: combine(
        colorize(),
        timestamp(),
        prettyPrint(),
        myFormat
    )
});

if (process.env.NODE_ENV === 'test') {
    logger.remove(new transports.Console());
    logger.add(new transports.File({ filename: 'iis-mock-sso.log' }));
} else {
    logger.remove(new transports.Console());
    logger.add(new transports.Console());
}

module.exports=logger;
