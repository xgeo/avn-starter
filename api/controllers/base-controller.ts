import * as express from 'express';
import { Bearer } from '../middlewares/bearer';
const jwt = require('jsonwebtoken');

export abstract class BaseController {
    protected abstract path;
    protected router = express.Router();
    protected jwt = jwt;
    protected bearer = new Bearer();
    protected visible: { [prop: string]: number };

    protected abstract intializeRoutes();

    constructor() { }
}
