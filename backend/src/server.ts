import { App } from './app';
import 'dotenv/config';

const PORT: string | number = process.env.PORT || 3001;

new App().start(PORT);
