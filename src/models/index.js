// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { SkillSet, Skill, Record, Student, Teacher, Mentor, Principal, Admin, Activity, User } = initSchema(schema);

export {
  SkillSet,
  Skill,
  Record,
  Student,
  Teacher,
  Mentor,
  Principal,
  Admin,
  Activity,
  User
};