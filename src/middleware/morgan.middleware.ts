import morgan from 'morgan';

// In dev you get colorful short logs. In production, Apache-style full logs for log aggregators.
//
// const format = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
//
// export const morganMiddleware = morgan(format);

export const morganMiddleware = morgan('combined');
