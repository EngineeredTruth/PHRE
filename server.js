import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = module.exports = express();

app.use(bodyParser.json());

app.use(cors());

app.use(express.static(__dirname + '/public'));

app.listen(5050, function() {
    console.log('Hosting port', 5050);
});
