import { MongoClient } from 'mongodb';
import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/drivefleet';
const client = new MongoClient(mongoUri);
const db = client.db();

export const auth = betterAuth({
  appName: 'DriveFleet',
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  secret: process.env.BETTER_AUTH_SECRET,
  database: mongodbAdapter(db, { client, transaction: false }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  onAPIError: {
    onError: (error, context) => {
      console.error('Better Auth API error:', {
        path: context?.path,
        status: error?.status,
        code: error?.code,
        message: error?.message,
      });
    },
  },
});