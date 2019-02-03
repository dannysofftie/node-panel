import * as fp from 'fastify-plugin';

export default fp(async (server, opts, next) => {
    server.get('/', {}, async (req, res) => {
        try {
            //
        } catch (error) {
            //
        }
    });

    server.post('/page', {}, async (req, res) => {
        try {
            //
        } catch (error) {
            //
        }
    });
    next();
});
