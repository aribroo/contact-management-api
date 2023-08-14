import app from './application/app.js';
import { logger } from './application/logging.js';

const port = 3000;

app.listen(port, () => {
  logger.info('App is running...');
});
