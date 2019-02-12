const axios = require('axios');
const config = require('config');
const mongodb = require('mongodb');
const restify = require('restify');

const server = restify.createServer({
    name: 'node-google-maps-autocomplete',
    version: '1.0.0'
});

let db;

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/autocomplete', async (req, res, next) => {

    const query = req.query['q'];

    if (!query) {
        return res.send({places:[]});
    }

    const data = await db.collection('autocomplete').findOne({ query });
    if (data) {
        return res.send({ predictions: data.predictions });
    }

    axios.get(`https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input=${encodeURI(query)}&key=${config.get('google.apiKey')}`)
        .then(async ({ data }) => {
            await db.collection('autocomplete').insertOne({ query, predictions: data.predictions });
            return res.send({ predictions: data.predictions });
        });
});

const init = async () => {
    const connection = await mongodb.MongoClient.connect(config.get('mongodb.uri'), { useNewUrlParser: true });
    db = connection.db('googlemaps');
    const port = config.get('server.port');
    await server.listen(port);
    console.log('%s listening at %s', server.name, server.url);
};

init();