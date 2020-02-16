import { Board } from 'johnny-five';
import { createStructure } from './Helpers/FileHelper';
import express = require('express');


const ServoRouter = require('./Routes/ServoRouter');
const ProjectRouter = require('./Routes/ProjectRouter')

var bodyParser = require('body-parser');
var cors = require('cors');

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

const board = new Board();
board.on('ready', async () => {

});

app.use('/servo', ServoRouter);
app.use('/project', ProjectRouter);



let port = 4003;
app.listen(port, () => {
  console.log(`listening on ${port}`);
})


createStructure();