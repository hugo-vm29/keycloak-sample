import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {getCORSConfig} from './utils/helpers';
import publicRoutes from './routes/sample';
import privateRoutes from './routes/private';
import authRoutes from './routes/authRoutes';
import {checkJwt} from './middlewares/authentication';
//import keycloak from 'keycloak-verify';

dotenv.config();




// /* eslint-disable @typescript-eslint/no-var-requires */
// //"http://127.0.0.1:9090"

// const config: any = {
//   "realm": "sample-db",
//   "auth-server-url": "http://keycloak-server:8080" ,
//   //"ssl-required": "external",
//   "resource": "my-server",
//   "bearer-only": true,
//   "credentials":{
//     "secret": "fqpKzNBpZI29Tp6SJv1h2mpjHlZp0xAh"
//   }
// }



const app: Express = express();


/** CORS setup **/
const corsOptions = getCORSConfig();
app.use(cors(corsOptions));

/**  pre-route middleware **/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**  routes  **/

app.get('/health-check', (req: Request, res: Response) => {
  const currentENV = process.env.ENV || "";
  res.send(`API running OK on ${currentENV}!`);
});

//admin@myapp.com admin123
app.use('/authentication', authRoutes);
app.use('/public', publicRoutes);
app.use('/private', checkJwt, privateRoutes);


export default app;
