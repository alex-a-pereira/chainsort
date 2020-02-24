import dotenv from 'dotenv';
dotenv.config();
import {} from 'dotenv/config';

import logger from './logger';

logger.verbose('verbose');
logger.debug('debug');
logger.info('info');
logger.warn('warn');
logger.error('error');
