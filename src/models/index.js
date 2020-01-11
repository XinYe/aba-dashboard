// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Blog, Post, Comment, SkillSet, Skill, User, Admin, Principal, Mentor, Teacher, Student, Activity, Employee, Warehouse } = initSchema(schema);

export {
  Blog,
  Post,
  Comment,
  SkillSet,
  Skill,
  User,
  Admin,
  Principal,
  Mentor,
  Teacher,
  Student,
  Activity,
  Employee,
  Warehouse
};