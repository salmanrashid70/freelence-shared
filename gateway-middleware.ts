import JWT from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { InternalServerError, NotAuthorizedError } from './error-handler';

const allowedTokens: string[] = [
  'auth',
  'seller',
  'buyer',
  'gig',
  'search',
  'order',
  'review',
  'message',
];

export function gatewayMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.headers?.gatewaytoken as string;

  if (!token) {
    throw new NotAuthorizedError(
      'Missing or invalid "gatewayToken" in request headers.',
      'Gateway Middleware'
    );
  }

  try {
    const secret = process.env.GATEWAY_SECRET || '';

    if (!secret) {
      throw new InternalServerError(
        'Gateway secret is not configured in environment.',
        'Gateway Middleware'
      );
    }

    const payload = JWT.verify(token, secret) as { id: string; iad: number };

    if (!allowedTokens.includes(payload.id)) {
      throw new NotAuthorizedError(
        'Invalid service identifier in gateway token.',
        'Gateway Middleware'
      );
    }

    next();
  } catch (error) {
    return next(
      new NotAuthorizedError(
        'Invalid or expired gateway token.',
        'Gateway Middleware'
      )
    );
  }
}
