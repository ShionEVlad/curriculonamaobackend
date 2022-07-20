import {
  Resume,
  ProfessionalExperiences,
  SchoolEducation,
  AditionalCourses,
  Ability,
} from '@prisma/client';

export type CreateCurriculumDTO = {
  theme: 'basic';
  resume: Resume;
  professionalExperiences: ProfessionalExperiences[];
  schoolEducation: SchoolEducation[];
  aditionalCourses: AditionalCourses[];
  ability: Ability[];
};
