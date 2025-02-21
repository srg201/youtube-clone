export const DEFAULT_LIMIT = 5;
export const APP_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000"; //TODO: Change to custom var if deploying outside vercel;
