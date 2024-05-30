// const dotenv = require(require'dotenv')
import dotenv from 'dotenv';

dotenv.config();
export const API_URL = String(process.env.API_URL)