/* eslint-disable camelcase */
import express, { Request, Response } from 'express';
// import keycloak from '../middlewares/keycloak';

const router = express.Router({ mergeParams: true });

router.get('/', async (req: Request, res: Response, next) => {
  
  const routeName = { logSource: 'get/sample' };

  try {
    
    return res.json({status: "success", data: "public route"});

  } catch (err: any) {
    console.error(`Error [${routeName}]: ${err}`);
    return next(err);
  }
});

export default router;
