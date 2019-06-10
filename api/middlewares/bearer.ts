import * as express from 'express';
const jwt = require('jsonwebtoken');
export class Bearer {
    constructor() { }

    public check(request: express.Request, response: express.Response, next: express.NextFunction) {
        let token = request.headers['x-access-token'] || request.headers['authorization'] as string;

        if (!token) return response.status(401).send({ auth: false, message: 'Unauthorized.' });

        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            if (err) return response.status(403).send({ auth: false, message: 'Failed to authenticate token.' });

            request['userId'] = decoded.id;
            next();
        });
    }
}