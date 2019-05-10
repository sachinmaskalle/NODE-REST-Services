let MINIMUM_VALUE = 1;
let MAXIMUM_VALUE = 10000;

class RandomNumGenerator {

    static generate(minimum = MINIMUM_VALUE, maximum = MAXIMUM_VALUE) {

        let generatedValue = Math.floor(Math.random() * (maximum - minimum) + minimum);
        return generatedValue;
    }
}

module.exports = RandomNumGenerator;
