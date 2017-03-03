const port = process.env.PORT ||  3000; //when access environment varivbales from the process that we run through nodemon we use this for depolyment as they would likey want tp use teir own port numbers which would cayse coflicts
const env = process.env.NODE || 'development';
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/Project-2-${env}`;
const sessionSecret = process.env.SESSION_SECRET || 'my awesome secret';

module.exports = { port, env, dbURI, sessionSecret};
