import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import eL from 'express-ejs-layouts';


import {Api} from './routs/router';


const app = express();
const PORT:(number) = 5000;

/**EJS**/
app.use(express.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/**Public path**/
app.use(express.static(path.join(__dirname, 'public')));


/**Body parser**/
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


/**Cors policy**/
app.use(cors());

/**Use router**/
app.use('/', Api)

/**Express EJS layouts**/
app.use(eL);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})