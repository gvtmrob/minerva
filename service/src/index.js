import express from 'express';
import cors from 'cors';
import endpoints from './endpoints';

const app = express();

app.use(cors());

app.use(_bodyParser);

app.use(_headerParser);

endpoints(app);

const server = app.listen(process.env.PORT || 8081, () => {
  const host = 'localhost',
    port = server.address().port;

  console.log(`Minerva started at ${host}:${port}`);

});

function _bodyParser(req, res, next){

  const method = req.method;
  if (method === 'GET' || method === 'DELETE') return next();

  let data = '';
  req.setEncoding('utf8');

  req.on('data', (chunk) => {
    data += chunk;
  });

  req.on('end', () => {
    try{
      req.body = JSON.parse(data);
      next();
    }
    catch(e) {
      res.status(400).send({
        status: 400,
        type: 'validation_violation',
        message : `Invalid body, ${e}`
      });
    }
  });
}

function _headerParser(req, res, next){

  const method = req.method;
  const headers = req.headers;
  const isJsonHeader = headers && headers['content-type'] && headers['content-type'] === 'application/json';

  if (method === 'GET' || method === 'DELETE') return next();

  if (!isJsonHeader) {
    res.status(400).send({
      status: 400,
      type: 'validation_violation',
      message : 'Wrong or missing Content-Type header'
    });
  }
  else {
    next();
  }
}
