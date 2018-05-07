'use strict';

class Token {
    constructor(params) {
        this.userName = params.userName;
        this.expDate = 'date script'; // set expiration date to 1 week
        this.type = 'type'; // set a type according to account type
    }
}

export default Token;
