import {Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const DB_NAME = "sample-db";
const AUTH_SERVER_URL = "http://keycloak-server:8080";


const formatJwtIssuer = (iss: string | undefined) => {
  
  const issuer = iss || "";

  if(process.env.ENV === "local"){
    const url = new URL(issuer);
    const formattedResponse = `${AUTH_SERVER_URL}${url.pathname}`
    return formattedResponse;
  }

  return iss;
}

const fetchJwksUri = async (issuer: string|undefined) => {
  
  if(!issuer)
    throw new Error("Missing issuer");

  const allowedIssuer = `${AUTH_SERVER_URL}/realms/${DB_NAME}`;
  const tokenIssuer = formatJwtIssuer(issuer);

  if(tokenIssuer !== allowedIssuer)
    throw new Error("Issuer not allowed")
  
  const response = await fetch(`${AUTH_SERVER_URL}/realms/${DB_NAME}/.well-known/openid-configuration`);
  const {jwks_uri} = await response.json();
  return jwks_uri;
};

const getKey = async (jwksUri:string, kid: string) => {
  const client = jwksClient({jwksUri});
  const key = await client.getSigningKey(kid);
  const signingKey = key.getPublicKey();
  return signingKey;
};

export const validateJwt =  async(req: Request, res: Response, next: NextFunction) => {

  const { authorization } = req.headers; 

  if(!authorization){
    return res.status(401).json({error: 'Missing authorization'});
  }
  
  try{

    const token = authorization.replace("Bearer ","").trim();
    const decodedToken = jwt.decode(token,  {complete: true} ) as JwtPayload;
    const { iss } = decodedToken.payload;
    const jwkUri = await fetchJwksUri( iss );
    //console.log("jwkUri --> ", jwkUri);
    const { kid } = decodedToken.header;
    //console.log("kid --> ", kid);
    const signKey = await getKey(jwkUri,kid);
    jwt.verify(token,signKey);
    return next();
    
  }catch(err: any) {
    return res.status(401).json({error: err?.message || 'unknown error ocurred'});
  }
}