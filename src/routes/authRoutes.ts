import express, { Request, Response } from 'express';
import axios from 'axios';

/* eslint-disable camelcase */
const router = express.Router({ mergeParams: true });

router.post('/login', async (req: Request, res: Response, next) => {
  
  const routeName = { logSource: 'post/authentication/login' };

  try {
    
    const { username, password } = req.body;

    const DB_NAME = "sample-db";
    const AUTH_SERVER_URL = "http://keycloak-server:8080";

    const authApiUrl = `${AUTH_SERVER_URL}/realms/${DB_NAME}/protocol/openid-connect/token`;

    const data = {
      client_id: "sample-client",
      grant_type: 'password',
      username,
      password
    };

    const options = {
      headers: {'content-type': 'application/x-www-form-urlencoded'}
    }

    const reqResponse = await axios.post(authApiUrl, data, options);
    return res.json(reqResponse.data);

  } catch (err: any) {
  
    if(err.response.status === 401){
      const errorDetails = err.response.data?.error_description || "Not authorized";
      return res.status(401).json({
        status: errorDetails
      });
    }

    return next(err);
  }

});

export default router;
