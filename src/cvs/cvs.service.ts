import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Resume } from '@prisma/client';

import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateCurriculumDTO } from 'src/dtos/CurriculumDTO';

@Injectable()
export class CvsService {
  constructor(private prisma: PrismaService) {}

  async createCurriculum(
    {
      ability,
      aditionalCourses,
      professionalExperiences,
      resume,
    }: CreateCurriculumDTO,
    payload: string,
  ): Promise<Resume> {
    const userAuthor = await this.prisma.user.findUnique({
      where: {
        email: payload,
      },
    });

    if (!userAuthor) {
      throw new UnauthorizedException(
        'Somente um usuário válido pode criar um currículo!',
      );
    }

    const createdResume = await this.prisma.resume.create({
      data: {
        ...resume,
        ability: {
          createMany: {
            data: ability,
          },
        },
        professionalExperiences: {
          createMany: {
            data: professionalExperiences,
          },
        },
        aditionalCourses: {
          createMany: {
            data: aditionalCourses,
          },
        },
      },
    });

    return createdResume;
  }
}
