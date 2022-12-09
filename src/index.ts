import 'express-async-errors';
import express from 'express';
import cors from 'cors';

import { AppDataSource } from './data-source';
import routes from './routes';

AppDataSource.initialize().then(() => {
  const app = express();
  
  app.use(
    cors({
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    })
  );
  app.use(express.json());
  app.use(routes);

  return app.listen(3333);
});
