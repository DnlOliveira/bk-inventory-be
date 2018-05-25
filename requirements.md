# Requirements

## Auth
1. Protect all endpoints with jwt token with the exception of /token which used for
generating tokens.
2. A single token type for client-app is sufficient.

# Functionality
1. Add, remove, update items (users, books).
2. Create user for client-app to manage.
3. Add favorites to a user object.
4. Return list of books or book, list of users or user.

# Testing
1. User in DB to allow hits to all endpoints.
2. Example items in db to test functions.