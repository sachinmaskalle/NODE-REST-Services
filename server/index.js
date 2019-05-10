let CustomerHosting = require('./hosting');

const DEFAULT_PORT = 9000;
let portNumber = process.env.PORT_NUMBER || DEFAULT_PORT;
let customerHosting = new CustomerHosting(portNumber);

customerHosting.startServer().then(
    () => {
        console.log('REST Service started Successfully!');
    },
    () => {
        console.log('Unable to start Customer REST service!');
    });

process.on('exit', () => customerHosting.stopServer());
process.on('SIGTERM', () => customerHosting.stopServer());
