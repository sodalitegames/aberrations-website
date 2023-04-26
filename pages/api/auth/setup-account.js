import { createHandler } from '../../../middleware';

import { Player } from '../../../models/Player';

const handler = createHandler();

handler.get(async (req, res) => {
  try {
    // Do something with Player
    const players = await Player.find().exec();

    res.status(200).json(players);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
});

export default handler;
