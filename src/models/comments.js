'use strict';

class Comment {
    constructor(params) {
        this.author = params.author;
        this.date = params.date;
        this.comment = params.comment;
        this.replies = [];
    }
}

export default Comment;
