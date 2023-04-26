import nextConnect from 'next-connect';

import databaseMiddleware from './database';

export function createHandler(...middleware) {
  return nextConnect({
    onError: (err, req, res, next) => {
      res.status(500).end({ message: 'An error occurred while accessing this route.', error: err });
    },
    onNoMatch: (req, res) => {
      res.status(404).end({ message: 'This route does not exists.', error: err });
    },
  }).use(databaseMiddleware, ...middleware);
}
