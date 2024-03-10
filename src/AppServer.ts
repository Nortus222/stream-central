import * as dotenv from 'dotenv';
import {App} from './App';

dotenv.config();

const port = process.env.PORT;
const mongoDBConnection = process.env.MONGO_CONNECTION_STRING;
console.log("server db connection URL " + mongoDBConnection);

let server: any = new App(mongoDBConnection).expressApp;
server.listen(port);
console.log("server running in port " + port);