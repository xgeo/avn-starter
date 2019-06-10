import { BaseController } from "./base-controller";
import User, { IUser } from '../models/user.model';
import * as express from 'express';

export class UserController extends BaseController {
    protected path = '/user';

    constructor() {
        super();
        this.intializeRoutes();
    }

    protected intializeRoutes() {
        this.router.post(this.path, (request: express.Request, response: express.Response, next: express.NextFunction) => this.store(request, response));
        this.router.post(`${this.path}/auth`, (request: express.Request, response: express.Response, next: express.NextFunction) => this.auth(request, response));
        this.router.get(`${this.path}/info`, this.bearer.check, (request: express.Request, response: express.Response, next: express.NextFunction) => this.info(request, response));
    }

    private async info(request: express.Request, response: express.Response) {
        return response.json({ success: true, jwt: 'ok' });
    }

    private async auth(request: express.Request, response: express.Response) {
        const body = request.body;

        const user = await User.findOne({ email: body.email });

        user.comparePassword(body.password, (error, isMatch) => {
            if (error) return response.json({ success: false, message: 'Auth problem!' });
            if (!isMatch) return response.json({ success: false, message: 'Auth problem!' });

            const token = this.jwt.sign({ id: user._id }, process.env.SECRET, {
                expiresIn: 300
            });

            response.status(200).send({ success: true, token: token });
        });
    }

    private async store(request: express.Request, response: express.Response) {
        const body = request.body;

        const newUser = new User({
            fullName: body.fullName,
            email: body.email,
            password: body.password
        });

        newUser.save((err) => {
            if (err) throw err;

            User.findOne({ email: body.email }, (err, user) => {
                if (err) throw err;

                response.json(
                    {
                        success: true,
                        data: user
                    }
                );
            });
        });
    }
}