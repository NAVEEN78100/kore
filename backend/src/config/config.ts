import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const required = (key: string): string => {
	const val = process.env[key];
	if (!val) throw new Error(`Missing required environment variable: ${key}`);
	return val;
};

export const config = {
	server: {
		port: process.env.PORT || 3001,
	},
	mongoUri: required('MONGO_URI'),
	jwt: {
		secret: required('JWT_SECRET'),
		expiresIn: process.env.JWT_EXPIRES_IN || '1d',
	},
	smtp: {
		host: process.env.SMTP_HOST || 'smtp.gmail.com',
		port: parseInt(process.env.SMTP_PORT || '587', 10),
		secure: process.env.SMTP_SECURE === 'true',
		user: process.env.SMTP_USER || '',
		pass: process.env.SMTP_PASS || '',
		from: process.env.SMTP_FROM || '',
		allowSelfSigned: process.env.SMTP_ALLOW_SELF_SIGNED === 'true',
		ignoreTLS: process.env.SMTP_IGNORE_TLS === 'true',
		devMode: process.env.NODE_ENV !== 'production',
	},
} as const;

export type AppConfig = typeof config;
export default config;
