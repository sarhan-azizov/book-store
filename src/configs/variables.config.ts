import * as dotenv from 'dotenv';

dotenv.config();

const isDevelopment = process.env.NODE_ENV === 'development';

export const DOTENV = {
  app: {
    port: String(process.env.PORT),
    disableLogging: !isDevelopment,
    logLevel: process.env.LOG_LEVELS || 'debug',
  },
  JWT: {
    secret: process.env.SECRET,
    expiresIn: process.env.EXPIRES_IN,
  },
  salt: process.env.SALT,
  database: {
    client: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: isDevelopment,
    synchronize: true,
  },
};
