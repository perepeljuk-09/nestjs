import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "user@mail.ru", description: "Почтовый ящик" })
  readonly email: string;

  @ApiProperty({ example: "12345da", description: "Пароль" })
  readonly password: string;
}
