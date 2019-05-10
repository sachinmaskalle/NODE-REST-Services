let express = require('express');
let http = require('http');
let path = require('path');
let bodyParser = require('body-parser');
let socketIO = require('socket.io');
let CustomerRouting = require('../routing');
let Utilities = require('../utilities');

const CUSTOMERS_API = '/api/customers';
const STATIC_CONTENST_FOLDER = 'wwwroot';

class CustomerHosting {
    constructor(portNumber) {
        if (!portNumber) {
            throw new Error(Utilities.ErrorConstants.INVALID_ARGUMENTS);
        }

        this.portNumber = portNumber;
        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.socketServer = socketIO.listen(this.httpServer);
        this.customerRouting = new CustomerRouting(this.socketServer);
        console.log(path.resolve(__dirname, '..', STATIC_CONTENST_FOLDER));
        this.app.use(bodyParser.json());
        this.app.use(CUSTOMERS_API, this.customerRouting.Router);
        this.app.use(express.static(path.resolve(__dirname, '..', STATIC_CONTENST_FOLDER)));
    }

    startServer() {
        let promise = new Promise((resolve, reject) => {
            if (this.httpServer) {
                this.httpServer.listen(this.portNumber, () => resolve());
            }
        });
        return promise;
    }

    stopServer() {
        let promise = new Promise((resolve, reject) => {
            if (this.httpServer) {
                this.httpServer.close(() => resolve());
            }
        });
        return promise;
    }
}

module.exports = CustomerHosting;