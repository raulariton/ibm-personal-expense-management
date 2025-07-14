import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { createClient } from 'redis';

// ensure env variables are defined
if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET)
  throw new Error(
    'Environment variables ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET must be defined',
  );
// get env variables and configure expiration times
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const accessTokenExpiration = '15m'; // 15 minutes
const refreshTokenExpiration = '7d'; // 7 days

export const createToken = (
  email: string,
  userId: string,
  name: string,
  tokenType: 'access' | 'refresh',
): string => {
  // set expiration time based on token type
  const expiration = tokenType === 'access' ? accessTokenExpiration : refreshTokenExpiration;
  const secret: string = tokenType === 'access' ? accessTokenSecret : refreshTokenSecret;

  // create payload (what the token will contain)
  const payload = {
    id: userId,
    email: email,
    fullName: name,
  };

  // sign the token
  return jwt.sign(payload, secret, { expiresIn: expiration });
};

/**
 * Verifies that a JWT token is valid (not expired, not tampered with, etc.)
 * If the token is valid, it returns the decoded payload.
 */
// TODO: fix async types
export const verifyToken = async (
  token: string,
  tokenType: 'access' | 'refresh',
  res: Response,
): Promise<JwtPayload | undefined> => {
  // select the secret based on token type
  const secret: string = tokenType === 'access' ? accessTokenSecret : refreshTokenSecret;

  /*
  if (tokenType === 'refresh') {
    // check if the token is valid using the bal
    const redisClient = createClient();
    redisClient.connect().catch((err) => {
      console.error('Error connecting to Redis:', err);
    });

    try {
      const invalidatedToken = await redisClient.hGetAll(`invalidatedTokens:${token}`);

      if (invalidatedToken) {
        res.status(403).json({ error: `Refresh token invalid.` });
        return;
      }
    } catch (err) {
      console.error('Error connecting to Redis:', err);
      res
        .status(500)
        .json({ error: 'Internal server error while checking if refresh token is blacklisted.' });
      return;
    }
  }
   */

  try {
    // verify the token, and return the decoded payload
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    if (res) {
      res.status(403).json({ error: `Invalid ${tokenType} token: ${error}` });
      return;
    }
    // TODO: don't throw an error here, just return undefined
    throw new Error(`Invalid ${tokenType} token: ${error}`);
  }
};
