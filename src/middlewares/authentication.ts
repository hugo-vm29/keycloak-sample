/* eslint-disable import/prefer-default-export */
import authProvider from '../authProviders';
import { Request, Response, NextFunction } from 'express';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  authProvider.validateJwt(req, res, next);
};
