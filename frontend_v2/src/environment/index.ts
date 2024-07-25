// environment/index.ts

import { environment as development } from './development';
import { environment as production } from './production';

export const environment = process.env.NODE_ENV === 'production' ? production : development;
