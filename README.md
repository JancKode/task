# task-list-webapp

# .env file for server

```DB_HOST=127.0.0.1
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=pass1234
DB_DATABASE=task
```

#.env file for client
```
REACT_APP_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
```

# How to run
1. Open two terminal/cmd and cd to client and server
2. create a .env file on both client and server directories
3. Do a ```yarn install``` on both client and server
4. type ```yarn start on``` server ( this will automatically seed a user and a task)
5. type ```yarn start on``` client to launch app
6. you can use ```user1/pass1234``` to login

# How to test
1. Open terminal/cmd and go to server
2. type ```yarn test```
