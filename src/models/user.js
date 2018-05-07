'use strict';

class User {
    constructor(params) {
        this.userName = params.userName;
        this.firstName = params.firstName;
        this.lastName = params.lastName;
        this.email = params.email;
        this.hash = params.hash;
        this.comments = [];
        this.favorites = []; // book instances will go inside
    }
}

export default User;
