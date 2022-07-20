import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateCurriculumDTO } from 'src/dtos/CurriculumDTO';

import path from 'path';
import ejs from 'ejs';
import pdf from 'html-pdf';

@Injectable()
export class CvsService {
  constructor(private prisma: PrismaService) {}

  async createCurriculum(
    {
      theme,
      ability,
      aditionalCourses,
      professionalExperiences,
      resume,
    }: CreateCurriculumDTO,
    payload: string,
  ): Promise<any> {
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

    const filePath = path.join(__dirname, 'templates', `${theme}.ejs`);

    ejs.renderFile(filePath, { resume }, (err, html) => {
      if (err) {
        Logger.log(err);
        throw new ConflictException('Erro na leitura do arquivo!');
      }

      const pdfSize = {
        height: '11.25in',
        width: '8.5in',
        header: {
          height: '20mm',
        },
        footer: {
          height: '20mm',
        },
      };

      const filePath = path.join(__dirname, 'templates', `teste.ejs`);

      pdf.create(html, pdfSize).toFile(filePath, (err, data) => {
        if (err) {
          Logger.log(err);
          throw new ConflictException('Erro ao gerar arquivo!');
        }
        Logger.log(err);
      });
    });
  }
}
