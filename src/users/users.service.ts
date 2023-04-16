import { RolesService } from "./../roles/roles.service";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private UserRepository: typeof User,
    private roleService: RolesService
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.UserRepository.create(dto);
    const role = await this.roleService.getRoleByValue("USER");
    await user.$set("roles", [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers() {
    const users = await this.UserRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.UserRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }
}
