import 'dotenv/config';
import os from 'os';

export const config = {
    PORT: process.env.PORT || 8080,
    MODE: process.env.MODE || "DEV",
    MONGO_DB_URL: process.env.MONGO_DB_URL || "",
    CLUSTER: {
        ENABLED: true,
        NUM_WORKERS: os.cpus().length
    }
};

console.log('Config loaded:', config);
