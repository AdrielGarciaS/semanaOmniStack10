import { Router } from 'express';
import cors from 'cors';

import DevController from './app/controllers/DevController';
import SearchController from './app/controllers/SearchController';

const routes = new Router();

routes.use(cors());

routes.get('/', (req, res) => res.json({ message: 'Welcome to Omni CLI' }));

routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);

routes.get('/search/', SearchController.index);

export default routes;
