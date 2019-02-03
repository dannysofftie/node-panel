import * as fastify from 'fastify';
import * as fastifyBlipp from 'fastify-blipp';
import { Server, IncomingMessage, ServerResponse } from 'http';
import * as sourceMapSupport from 'source-map-support';

import routes from '../routes/api';
import db from '../modules/Database';
import * as config from 'config';

/**
 * Application server instance.
 *
 * @export
 * @class App
 */
export default class App {
    /**
     * Application server instance.
     *
     * @private
     * @type {fastify.FastifyInstance<Server, IncomingMessage, ServerResponse>}
     * @memberof App
     */
    private server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse>;

    /**
     * Application port number
     *
     * @private
     * @type {string}
     * @memberof App
     */
    private port: string;

    constructor() {
        this.port = (3000 || process.env.PORT) as string;
        this.server = fastify();
        this.config();
    }

    /**
     * Application level configurations
     *
     * @private
     * @memberof App
     */
    private config() {
        sourceMapSupport.install();

        this.server.register(fastifyBlipp);

        // after server was created
        this.server.register(db, config.get('db'));
        this.server.register(routes);
    }

    /**
     * Start application server.
     *
     * @memberof App
     */
    public async start() {
        try {
            await this.server.listen(parseInt(this.port), '127.0.0.1');
            this.server.blipp();
        } catch (err) {
            this.server.log.error(err);
            process.exit(1);
        }
        process.on('uncaughtException', error => {
            console.error(error);
        });
        process.on('unhandledRejection', error => {
            console.error(error);
        });
    }
}
