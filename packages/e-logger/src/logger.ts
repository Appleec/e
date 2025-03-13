import c from 'ansis'
import util from 'util'
import * as symbols from './symbols'

const REGEX_PREFIX = /{time}|{symbol}|{type}/g

export type LoggerType = 'debug' | 'info' | 'success' | 'warn' | 'error' | 'exec' | 'mark'

export interface LoggerOptions {
    prefix?: string
}

/**
 * Logger
 *
 * @example
 * const logger = new Logger()
 *
 * logger.log('message')
 * // => print `message`
 */
export class Logger {
    private readonly options: LoggerOptions
    constructor(options: LoggerOptions = {}) {
        this.options = options
    }

    public template(type: LoggerType) {
        const { prefix } = this.options

        if (!prefix || prefix.length === 0)
            return ''

        if (!REGEX_PREFIX.test(prefix))
            return prefix

        return prefix.replace(REGEX_PREFIX, (match) => {
            switch (match) {
                case '{time}':
                    // new Date().toISOString()
                    // Date.now()
                    return c.grey(
                        new Date().toISOString()
                    )
                case '{symbol}':
                    return symbols?.[type].symbol || symbols?.['mark'].symbol
                case '{type}':
                    return symbols?.[type].label || symbols?.['mark'].label
            }
            return match
        })
    }

    /**
     * Format
     * @param args
     * @param customPrefix
     */
    public format(args: any[], customPrefix?: string): string {
        const fmt = (!customPrefix
        || customPrefix.length === 0) ? '%s' : '' + customPrefix

        return util
            .format(fmt, ...args)
            .split('\n')
            .join('')
    }

    /**
     * Log
     * @param args
     */
    public log(...args): void {
        console.log(this.format(args))
    }

    /**
     * Info
     * @param args
     */
    public info(...args): void {
        const prefix = this.template('info')
        console.info(this.format(args, prefix))
    }

    /**
     * success
     * @param args
     */
    public success(...args): void {
        const prefix = this.template('success')
        console.log(this.format(args, prefix))
    }

    /**
     * error
     * @param args
     */
    public error(...args): void {
        const prefix = this.template('error')
        console.error(this.format(args, prefix))
    }

    /**
     * error
     * @param args
     */
    public warn(...args): void {
        const prefix = this.template('warn')
        console.warn(this.format(args, prefix))
    }
}
