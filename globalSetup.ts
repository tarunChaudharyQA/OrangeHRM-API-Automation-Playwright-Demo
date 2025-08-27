import { storeAuthCookie } from './authentication';
import { FullConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

async function globalSetup(config: FullConfig) {
  const env = process.env.ENVIRONMENT || 'test'; // Default to 'test' if not provided
  const password = process.env.PASSWORD;

  if (![`test`, `dev`, `beta`].includes(env)) {
    throw new Error(`Please provide a correct environment value using ENVIRONMENT variable (local|test|dev|beta|prod)`);
  }

  if (!password) {
    throw new Error('Password is required');
  }
  await storeAuthCookie(password, env);
}

export default globalSetup;
