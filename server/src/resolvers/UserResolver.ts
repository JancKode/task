import { Resolver, Mutation, Arg, ObjectType, Field } from "type-graphql";
import bcrypt from "bcrypt";
import { User } from "../entity/User";
import { sign } from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import {v4} from "uuid";

const uuId = v4()

@ObjectType()
class LoginResponse {
  @Field()
  token: string;

  @Field()
  userId: string;
}

@Resolver()
export class RegisterResolver {

  @Mutation(() => String)
  async register(
    @Arg("username") username: string,
    @Arg("password") password: string
  ): Promise<string> {
    const userRepo = AppDataSource.getRepository(User);

    // Check if username already exists
    const existingUser = await userRepo.findOne({ where: { username } });
    if (existingUser) {
      throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User();
    user.userId = uuId;
    user.username = username;
    user.password = hashedPassword;
    await AppDataSource.manager.save(user);

    return user.id.toString();
  }
}


@Resolver()
export class LoginResolver {
   

    async isPasswordValid(providedPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(providedPassword, hashedPassword);
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg("username") username: string,
        @Arg("password") password: string
    ): Promise<LoginResponse> {
        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOne({ where: { username } });

        if (!user) {
            throw new Error("User not found");
        }

        const validate = await this.isPasswordValid(password, user.password);
        if (!validate) {
            throw new Error("Incorrect password");
        }

        // User is authenticated, issue token
        const token = sign({ userId: user.id }, "yourSecretKey", {
            expiresIn: "1h",
        });

        return {
            token,
            userId: user.userId.toString(),
        };
    }
}
