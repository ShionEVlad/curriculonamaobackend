import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateUserDTO } from 'src/dtos/UserDTO';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: username,
      },
    });

    return user;
  }

  async registerRefreshToken(
    email: string,
    refreshToken: string,
  ): Promise<User> {
    const cryptedRefreshToken = await bcrypt.hash(refreshToken, 10);

    const user = await this.prisma.user.update({
      where: { email },
      data: {
        refreshToken: cryptedRefreshToken,
      },
    });

    return user;
  }

  async createUser({
    email,
    name,
    password,
  }: CreateUserDTO): Promise<User | undefined> {
    const cryptedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          name,
          password: cryptedPassword,
          createdAt: new Date(),
        },
      });

      return user;
    } catch {
      throw new BadRequestException('Não foi possível criar o usuário');
    }
  }
}
