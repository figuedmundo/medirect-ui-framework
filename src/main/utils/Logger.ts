// src/utils/Logger.ts
export class Logger {
    log(message: string) {
        console.log(`[LOG] ${new Date().toISOString()} - ${message}`);
    }

    error(message: string) {
        console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
    }
}