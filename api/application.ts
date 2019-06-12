import * as express from 'express';
import * as bodyParser from 'body-parser';
const fs = require('fs');
const cors = require('cors');

export class Application {
    public app: express.Application;
    public port: number;
    public http: any;

    constructor(port) {
        this.app = express();
        this.http = require('http').Server(this.app);
        this.port = port;
        this.initializeMiddlewares();
    }

    public declareControllers(controllers) {
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    private initializeControllers(controllers: any[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    public listen() {
        this.http.listen(this.port, () => {
            fs.readFile('greetings.txt', 'utf8', (err, text) => console.log(text));

            console.log(`App listening on the port ${this.port}`);
        });
    }
}
