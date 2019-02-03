import { Model } from 'mongoose';
import * as Mongoose from 'mongoose';
import { VehicleModel, Vehicle } from '../models/Sample';

import * as fp from 'fastify-plugin';

export interface Models {
    Vehicle: Model<VehicleModel>;
}

export interface Db {
    models: Models;
}

export default fp(async (fastify, opts: { uri: string }, next) => {
    await Mongoose.connect(opts.uri, {
        useNewUrlParser: true,
        keepAlive: true,
    }).catch(e => console.log(e));

    const models: Models = {
        Vehicle: Vehicle,
    };

    fastify.decorate('db', { models });

    next();
});
