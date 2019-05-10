let Customer = require('../models');
let Utilities = require('../utilities');

const MIN_SEARCH_LENGTH = 3;
const SEARCH_INDEX_POS = 0;
const MIN_ID_REQUIRED = 1;

class CustomerService {
    constructor() {
        this.customers =
            [{
                "customerId": 1,
                "customerName": "Lynsey Shrimpling",
                "address": "Palanit",
                "email": "lshrimpling0@tripod.com",
                "phone": "773-834-2760",
                "credit": 13790,
                "status": false,
                "remarks": "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque."
            }, {
                "customerId": 2,
                "customerName": "Natal Pettendrich",
                "address": "Kanal",
                "email": "npettendrich1@ucoz.ru",
                "phone": "524-946-1944",
                "credit": 23147,
                "status": false,
                "remarks": "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat."
            }, {
                "customerId": 3,
                "customerName": "Verine Duggan",
                "address": "Karinë",
                "email": "vduggan2@tamu.edu",
                "phone": "340-624-0565",
                "credit": 13972,
                "status": false,
                "remarks": "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti."
            }, {
                "customerId": 4,
                "customerName": "Charline Huckfield",
                "address": "Badajoz",
                "email": "chuckfield3@blinklist.com",
                "phone": "863-911-4588",
                "credit": 24698,
                "status": false,
                "remarks": "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus."
            }, {
                "customerId": 5,
                "customerName": "Amy Cella",
                "address": "Mönsterås",
                "email": "acella4@salon.com",
                "phone": "760-680-1606",
                "credit": 15148,
                "status": false,
                "remarks": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est."
            }, {
                "customerId": 6,
                "customerName": "Ricoriki Rist",
                "address": "Tilcara",
                "email": "rrist5@bing.com",
                "phone": "105-862-6297",
                "credit": 19854,
                "status": true,
                "remarks": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem."
            }, {
                "customerId": 7,
                "customerName": "Eunice Roycroft",
                "address": "Polos",
                "email": "eroycroft6@japanpost.jp",
                "phone": "556-643-4421",
                "credit": 33177,
                "status": true,
                "remarks": "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti."
            }, {
                "customerId": 8,
                "customerName": "Robinia Dadge",
                "address": "Líně",
                "email": "rdadge7@seattletimes.com",
                "phone": "809-556-2382",
                "credit": 41365,
                "status": true,
                "remarks": "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem."
            }, {
                "customerId": 9,
                "customerName": "Cam Vye",
                "address": "Xinan",
                "email": "cvye8@gmpg.org",
                "phone": "111-563-1111",
                "credit": 34550,
                "status": false,
                "remarks": "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam."
            }, {
                "customerId": 10,
                "customerName": "Arielle Ellington",
                "address": "Acobambilla",
                "email": "aellington9@xing.com",
                "phone": "640-399-8526",
                "credit": 41781,
                "status": true,
                "remarks": "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis."
            }];
    }

    getCustomers() {
        let promise = new Promise((resolve, reject) => {
            resolve(this.customers);
        });

        return promise;
    }

    findCustomers(customerName) {
        let promise = new Promise((resolve, reject) => {
            let validation = customerName && customerName.length >= MIN_SEARCH_LENGTH;

            if (!validation) {
                reject({
                    error: Utilities.ErrorConstants.BUSINESS_VALIDATION_FAILED
                });
                return;
            }

            if (validation) {
                let filteredCustomers = this.customers.filter(customer =>
                    customer.customerName.indexOf(customerName) >= SEARCH_INDEX_POS);

                resolve(filteredCustomers);
            }
        });

        return promise;
    }

    getCustomerDetail(customerId) {
        let promise = new Promise((resolve, reject) => {
            let validation = customerId && customerId >= MIN_ID_REQUIRED;

            if (!validation) {
                reject({
                    error: Utilities.ErrorConstants.BUSINESS_VALIDATION_FAILED
                });
                return;
            }

            let filteredCustomer = null;

            for (let customer of this.customers) {
                if (customer.customerId === customerId) {
                    filteredCustomer = customer;
                    break;
                }
            }

            if (filteredCustomer) {
                resolve(filteredCustomer);
            } else {
                reject({
                    error: Utilities.ErrorConstants.RECORD_NOT_FOUND
                })
            }
        });

        return promise;
    }

    addNewCustomer(customer) {
        let promise = new Promise((resolve, reject) => {
            let validation = customer && customer.customerId && customer.customerName && customer.credit;

            if (!validation) {
                reject({
                    error: Utilities.ErrorConstants.BUSINESS_VALIDATION_FAILED
                });
                return;
            }

            this.customers.push(customer);
            resolve({
                status: true
            });
        });
        return promise;
    }
}

module.exports = CustomerService;
