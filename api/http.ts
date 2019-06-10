import { IndexController } from "./controllers/index-controller";
import { Application } from "./application";
import { UserController } from "./controllers/user-controller";
const dotenv = require('dotenv');
const environment = dotenv.config({ path: `${process.cwd()}/environments/.env`, debug: true, encoding: 'UTF-8' });
if (environment.error) {
    console.log(environment);
    throw environment.error;
}

const app = new Application(3001);

app.declareControllers([
    new IndexController(),
    new UserController()
]);

app.listen();
