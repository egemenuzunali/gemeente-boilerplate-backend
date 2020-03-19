berichtgeving-backend

default port: 5000

### Create user
User can be created with `yarn user:create` the command will prompt for the required information and create an user with a random generated password.

### Authentication
- SignIn with mutation signIn, adding username (email) & password (plain), this will return a token and the user
- Do any following call with header `authorization: $token`
