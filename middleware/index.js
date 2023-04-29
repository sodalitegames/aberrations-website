import nextConnect from 'next-connect';

export function createHandler(...middleware) {
  return nextConnect({
    onError: (err, req, res, next) => {
      res.status(500).end('An error occurred while accessing this route.');
    },
    onNoMatch: (req, res) => {
      res.status(404).end('This route does not exist.');
    },
  }).use(...middleware);
}
