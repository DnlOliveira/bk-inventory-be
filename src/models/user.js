'use strict';

import { users } from '../../config';

const { accountTypes: { standard } } = users;

class User {
    constructor(params) {
        this.userName = params.userName;
        this.firstName = params.firstName;
        this.lastName = params.lastName;
        this.email = params.email;
        this.hash = params.hash;
        this.accountType = params.accountType || standard;
        this.comments = [];
        this.favorites = []; // book instances will go inside
        this.createdDate = new Date(Date.now()).toISOString();
    }
}

export default User;
