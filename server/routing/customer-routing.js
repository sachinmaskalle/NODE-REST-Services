let express = require('express');
let CustomerService = require('../services');
let Customer = require('../models');
let Utilities = require('../utilities');

const NEW_CUSTOMER_EVENT = 'NEW_CUSTOMER_RECORD';

class CustomerRouter {
    constructor(socketServer) {
        this.socketServer = socketServer;
        this.router = express.Router();
        this.customerService = new CustomerService();
        this.initializeRouting();
    }

    initializeRouting() {
        this.router.get('/', async (request, response) => {
            try {
                let result = await this.customerService.getCustomers();

                response.status(Utilities.HttpStatesCodes.OK).json(result);
            } catch (error) {
                response.status(Utilities.HttpStatesCodes.SERVER_ERROR).json(error);
            }
        });

        this.router.get('/:searchString', async (request, response) => {
            try {
                let searchString = request.params.searchString;
                let result = await this.customerService.findCustomers(searchString);

                response.status(Utilities.HttpStatesCodes.OK).json(result);
            } catch (error) {
                response.status(Utilities.HttpStatesCodes.SERVER_ERROR).json(error);
            }
        });

        this.router.get('/detail/:id', async (request, response) => {
            try {
                let customerId = parseInt(request.params.id);
                let result = await this.customerService.getCustomerDetail(customerId);

                response.status(Utilities.HttpStatesCodes.OK).json(result);
            } catch (error) {
                response.status(Utilities.HttpStatesCodes.SERVER_ERROR).json(error);
            }
        });

        this.router.post('/', async (request, response) => {
            try {
                let body = request.body;
                let customer = new Customer(
                    body.customerId, body.customerName, body.address, body.email, body.phone, body.credit, body.status, body.remarks);

                let result = await this.customerService.addNewCustomer(customer);

                response.status(Utilities.HttpStatesCodes.OK).json(result);

                if (this.socketServer) {
                    this.socketServer.emit(NEW_CUSTOMER_EVENT, customer);
                }

            } catch (error) {
                response.status(Utilities.HttpStatesCodes.SERVER_ERROR).json(error);
            }
        });
    }

    get Router() {
        return this.router;
    }
}

module.exports = CustomerRouter;
