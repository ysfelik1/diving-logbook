import express from 'express';

const app = express();

import usersRoutes from './api/routes/users.js'; 
import divesRoutes from './api/routes/dives.js'; 


// Your middleware, routes, etc.
app.use('/users',usersRoutes);
app.use('/dives',divesRoutes);

export default app;
