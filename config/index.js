import dotenv from 'dotenv';
dotenv.config();

export const { APP_PORT, MONGO_URL, PASSPORT_SECRET } = process.env;