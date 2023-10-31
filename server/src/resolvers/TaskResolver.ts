import {
  Resolver,
  Query,
  UseMiddleware,
  Mutation,
  Arg,
  Ctx,
} from "type-graphql";
import { Task } from "../entity/Task";
import { AppDataSource } from "../data-source";
import {v4} from "uuid";

const uuId = v4()

@Resolver()
export class TaskResolver {
  @Query(() => [Task])
  async tasks(@Arg("userId") userId: string): Promise<Task[]> {
    const taskRepo = AppDataSource.getRepository(Task);
    const tasks = await taskRepo.find({ where: { userId } });
    
    return tasks;
  }

  @Query(() => Task, { nullable: true })
  async task(@Arg("userId") userId: string): Promise<Task | undefined> {
    const taskRepo = AppDataSource.getRepository(Task);

    return await taskRepo.findOne({
      where: { userId },
    });
  }
}

@Resolver()
export class TaskMutationResolver {
  @Mutation(() => Task)
  async createTask(
    @Arg("title") title: string,
    @Arg("description", { nullable: true }) description: string,
    @Arg("userId") userId: string
  ): Promise<Task> {
    // Ensure the user is authenticated
  
    // if no user is found, throw an error
    if (!userId) throw new Error("Not authenticated");

    const task = new Task();
    task.title = title;
    task.userId = userId;
    task.description = description;

    await AppDataSource.manager.save(task);
    return task;
  }

  @Mutation(() => Task)
  async updateTask(
    @Arg("userId") userId: string,
    @Arg("notes", { nullable: true }) notes: string,
    @Arg("description", { nullable: true }) description: string
  ): Promise<Task> {
    const taskRepo = AppDataSource.getRepository(Task);
    const task = await taskRepo.findOne({
      where: { userId },
    });
    if (!task) throw new Error("Task not found");

    if (notes) task.description = notes;

    await AppDataSource.manager.save(task);
    return task;
  }

  @Mutation(() => Boolean)
  async deleteTask(
    @Arg("userId") userId: string,
    @Arg("noteId") notedId: string
  ): Promise<boolean> {
    const taskRepo = AppDataSource.getRepository(Task);
    const task = await taskRepo.findOne({
      where: { userId, id: parseInt(notedId) },
    });
    if (!task) throw new Error("Task not found");

    await AppDataSource.manager.remove(task);

    return true;
  }
}
