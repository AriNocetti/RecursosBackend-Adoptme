import 'dotenv/config';

export const config = {
    PORT: process.env.PORT || 8080,
    MODE: process.env.MODE || "DEV",
    MONGO_DB_URL: process.env.MONGO_DB_URL || ""
};

console.log('Config loaded:', config);

