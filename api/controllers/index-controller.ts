import * as express from 'express';
import { BaseController } from './base-controller';

export class IndexController extends BaseController {
    protected path = '/';

    constructor() {
        super();
        this.intializeRoutes();
    }

    protected intializeRoutes() { }
}