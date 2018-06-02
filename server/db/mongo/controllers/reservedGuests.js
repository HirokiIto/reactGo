import _ from 'lodash';
import ReservedGuest from '../models/reservedGuests';

/**
 * List
 */
export function all(req, res) {
  ReservedGuest.find({}).exec((err, guests) => {
    if (err) {
      console.log('Error in first query');
      return res.status(500).send('Something went wrong getting the data');
    }

    return res.json(guests);
  });
}

/**
 * Add a ReservedGuest
 */
export function add(req, res) {
  // console.log('add: ', req.body)
  ReservedGuest.create(req.body, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    }

    return res.status(200).send('OK');
  });
}


/**
 * Remove a ReservedGuest
 */
export function remove(req, res) {
  ReservedGuest.findOneAndRemove(req.body, (err) => {
    if (err) {
      console.log('Error on delete');
      return res.status(500).send('We failed to delete for some reason');
    }

    return res.status(200).send('Removed Successfully');
  });
}

export default {
  all,
  add,
  remove,
};
