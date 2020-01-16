import Dev from '../models/Dev';

import formatTechs from '../../util/formatTechs';

export default {
  async index(req, res) {
    const { latitude, longitude, techs } = req.query;

    const arrayTechs = formatTechs(techs);

    const devs = await Dev.find({
      techs: {
        $in: arrayTechs,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });

    return res.json(devs);
  },
};
