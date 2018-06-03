import _ from 'lodash';
import Guest from '../models/guests';

/**
 * List
 */
export function all(req, res) {
  Guest.find({}).exec((err, guests) => {
    if (err) {
      console.log('Error in first query');
      return res.status(500).send('Something went wrong getting the data');
    }

    return res.json(guests);
  });
}

/**
 * Add a Guest
 */
export function add(req, res) {
  Guest.create(req.body, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    }

    return res.status(200).send('OK');
  });
}

export default {
  all,
  add
};
