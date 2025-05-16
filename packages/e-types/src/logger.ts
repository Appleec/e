export type LoggerBaseOptions = {
    level: 'debug' | 'error'
} | {
    level: 'info' | 'warn'
    prefix: string
    message: string
}
