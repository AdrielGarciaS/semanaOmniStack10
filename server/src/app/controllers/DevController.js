import axios from 'axios';
import Dev from '../models/Dev';
import formatTechs from '../../util/formatTechs';
import { findConnections, sendMessage } from '../../websocket';

export default {
  async index(req, res) {
    return res.json(await Dev.find());
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    const existDev = await Dev.findOne({ github_username });

    if (existDev) {
      return res.json(existDev);
    }

    const response = await axios.get(
      `https://api.github.com/users/${github_username}`
    );
    const { name = login, bio, avatar_url } = response.data;
    const techsArray = formatTechs(techs);

    const location = {
      type: 'Point',
      // O mongo grava primeiro longitude e depois latitude
      coordinates: [longitude, latitude],
    };

    const dev = await Dev.create({
      github_username,
      name,
      bio,
      avatar_url,
      techs: techsArray,
      location,
    });

    const sendSocketMessageTo = findConnections(
      { latitude, longitude },
      techsArray
    );

    sendMessage(sendSocketMessageTo, 'new-dev', dev);

    return res.json(dev);
  },
};
