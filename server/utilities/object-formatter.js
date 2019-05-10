let ErrorConstants = require('./error-constants');
const DELIMETER = ', ';
const NO_OF_TRIAL_CHARS = 2;
const START_POS = 0;

class ObjectFormatter {
    static format(obj) {
        if (!obj) {
            throw new Error(ErrorConstants.INVALID_ARGUMENTS);
        }

        let formattedMessage = '';

        for (let propertyIndex in obj) {
            let property = obj[propertyIndex];
            console.log('Prop ' + property);

            if (typeof property !== 'function') {
                formattedMessage += `${property}${DELIMETER}`;
            }
        }

        formattedMessage = formattedMessage.substr(START_POS, formattedMessage.length - NO_OF_TRIAL_CHARS);

        return formattedMessage;
    }
}

module.exports = ObjectFormatter;
