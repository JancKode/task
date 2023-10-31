import { DefaultNamingStrategy } from "typeorm";

class CustomNamingStrategy extends DefaultNamingStrategy {
  // ... you can override methods if you want custom naming strategies
}

const ormconfig = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "pass1234",
  database: "task",
  synchronize: true,
  logging: false,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
  namingStrategy: new CustomNamingStrategy(),
};

export default ormconfig;
