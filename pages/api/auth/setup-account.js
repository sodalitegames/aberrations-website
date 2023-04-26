import { createHandler } from '../../../middleware';

import authenticateMiddleware from '../../../middleware/authenticate';

import { Player } from '../../../models/Player';

const handler = createHandler(authenticateMiddleware);

handler.post(async (req, res) => {
  try {
    // Do something with Player
    const players = await Player.find().exec();

    console.log(req.body);

    res.status(200).json({ auth: req.auth, user: req.user, token: req.token, players, body: req.body });
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while accessing this route.', error: err });
  }
});

export default handler;
