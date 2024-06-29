import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}` +
        `\n\tquery :: ${JSON.stringify(req.query)}\n\tbody :: ${JSON.stringify(req.body)}\n\tauth :: ${req.headers.authorization}\n`,
    );
    next();
  }
}
