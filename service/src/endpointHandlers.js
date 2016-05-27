/* eslint arrow-parens: 0 */
import { createEventObject, getEventObjects, getEventObject, updateEventObject, deleteEventObject } from './restCalls/eventsPersistence';
import { getToken } from './restCalls/tokens';
import { getBaseUris } from 'config';


async function getEvents(req, res) {

  return new Promise(async(resolve, reject) => {

    try {

      let token = await getToken();
      token = token.access_token;

      const query = req.query.q;
      const events = await getEventObjects(token, query);

      res.status(200).send(events);
      return resolve();
    }
    catch(e) {

      console.log('Failed returning events.', e);
      res.status(e.status).send(e);
      return reject(e);
    }
  });
}

function createEvent(req, res) {

  return new Promise(async(resolve, reject) => {

    try {

      let token = await getToken();
      token = token.access_token;

      const data = req.body;
      const event = await createEventObject(token, data);

      res.status(201).send(event);
      return resolve();
    }
    catch(e)  {

      console.log('Failed creating event.', e);
      res.status(e.status).send(e);
      return reject(e);
    }
  });
}

function getEvent(req, res) {

  return new Promise(async(resolve, reject) => {

    try {

      let token = await getToken();
      token = token.access_token;

      const eventId = req.params.eventId;
      const event = await getEventObject(token, eventId);

      res.status(200).send(event);
      return resolve();
    }
    catch(e)  {

      console.log('Failed creating event.', e);
      res.status(e.status).send(e);
      return reject(e);
    }
  });
}

function updateEvent(req, res) {

  return new Promise(async(resolve, reject) => {

    try {

      let token = await getToken();
      token = token.access_token;

      const eventId = req.params.eventId;
      const data = req.body;
      const event = await updateEventObject(token, eventId, data);

      res.status(200).send(event);
      return resolve();
    }
    catch(e)  {

      console.log('Failed updating event.', e);
      res.status(e.status).send(e);
      return reject(e);
    }
  });

}


function deleteEvent(req, res) {

  return new Promise(async(resolve, reject) => {

    try {

      let token = await getToken();
      token = token.access_token;

      const eventId = req.params.eventId;
      const event = await deleteEventObject(token, eventId);

      res.status(204).send(event);
      return resolve();
    }
    catch(e)  {

      console.log('Failed deleting event.', e);
      res.status(e.status).send(e);
      return reject(e);
    }
  });
}

function getRaml(req, res) {

  res.redirect(`${getBaseUris().minervaDocu}/api.raml`);
}

export {
  getEvents,
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
  getRaml
};
