import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  connectionString?: string;
  jwtSecret: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  connectionString: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET || 'your-default-jwt-secret',
};

export default config;