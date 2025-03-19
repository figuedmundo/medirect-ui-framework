import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize } = format;

const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

// Create a logger instance
const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add timestamp
        colorize(),
        logFormat
    ),
    transports: [
        new transports.Console(), // Log to the console
        new transports.File({ filename: 'logs/test.log' }), // Log to a file
    ],
});

export default logger;