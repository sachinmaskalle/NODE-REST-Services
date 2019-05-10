let ObjectFormatter = require('../utilities');

class Customer {
    constructor(id, name, address, email, phone, credit, status, remarks) {
        [
            this.id, this.name, this.address,
            this.email, this.phone,
            this.credit, this.status, this.remarks
        ] = arguments;
    }

    toString() {
        return ObjectFormatter.format(this);
    }
}

module.exports = Customer;
