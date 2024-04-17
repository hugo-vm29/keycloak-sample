/* eslint-disable camelcase */
import express, { Request, Response } from 'express';
// import keycloak from '../middlewares/keycloak';

const router = express.Router({ mergeParams: true });

router.get('/'  ,async (req: Request, res: Response, next) => {
  
  const routeName = { logSource: 'get/protected' };

  try {


    return res.json({message: "successfully authorized", data: "private route test"});

  } catch (err: any) {
    
    console.log("TEST 1", err.response.data);
    console.log("TEST 2", err.response.status);

    console.error(`Error [${routeName}]: ${err}`);
    return next(err);
  }

});

export default router;
