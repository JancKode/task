import { AppDataSource } from "./data-source";
import { Task } from "./entity/Task";
import { User } from "./entity/User";
import * as bcrypt from "bcrypt";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { TaskMutationResolver, TaskResolver } from "./resolvers/TaskResolver";
import { LoginResolver, RegisterResolver } from "./resolvers/UserResolver";

const saltRounds = 10;

AppDataSource.initialize()
  .then(async () => {
    AppDataSource.manager.getRepository(Task).clear()
   
    console.log("Inserting a new user into the database...");
    const user = new User();
    user.username = "user1";
    user.password = await bcrypt.hash("pass1234", saltRounds);
    user.id = 1;
    user.createdAt = new Date();
    user.userId = "unique-id1";
    await AppDataSource.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await AppDataSource.manager.find(User);
    console.log("Loaded users: ", users);

    const task = new Task();
   
    task.userId = "unique-id1";
    task.title = "Your title here";
    task.description = "Your notes here";
    await AppDataSource.manager.save(task);

    console.log(
      "Here you can setup and run express / fastify / any other framework."
    );

    // Build GraphQL schema
    const schema = await buildSchema({
      resolvers: [
        TaskResolver,
        RegisterResolver,
        LoginResolver,
        TaskMutationResolver,
      ],
      validate: false,
    });

    // Create an express server
    const app = express();

    // Create a new Apollo server and pass in our schema data
    const server = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res }), // This can be used for authentication purposes
    });

    await server.start();

    // Connect Apollo server with express using middleware
    server.applyMiddleware({ app, path: "/graphql" });

    // Start the server
    const PORT = 4000;
    app.listen(PORT, () => {
      console.log(
        `Server is running on http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  })
  .catch((error) => console.log(error));
