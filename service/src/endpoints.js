import { getEvents, createEvent, getEvent, updateEvent, deleteEvent, getRaml } from './endpointHandlers';

export default function(app) {

  app.get('/events', getEvents);

  app.post('/events', createEvent);

  app.get('/events/:eventId', getEvent);

  app.put('/events/:eventId', updateEvent);

  app.delete('/events/:eventId', deleteEvent);

  app.get('/', getRaml);

}
