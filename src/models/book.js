'use strict';

class Book {
    constructor(params) {
        this.title = params.title;
        this.author = params.author;
        this.published = params.published;
        this.icon = params.icon;
        this.rating = null;
        this.comments = [];
    }
}

export default Book;
